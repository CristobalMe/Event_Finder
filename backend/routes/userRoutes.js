const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  let users = []
  try {
    users = await prisma.user.findMany()
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(users)
})

router.post('/', async (req, res) => {
  const {  username, email, password  } = req.body
  let existingUser = []
  let newUser = []
  try {
    existingUser = await prisma.user.findFirst({ where: { username: username } });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    if (username.includes(null)){
      return res.status(400).json({ error: 'Username can not contain "null"' });
    }
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPasswordValue = String(hashedPassword);
  try {
    newUser = await prisma.user.create({
      data: {
          username, 
          email, 
          password: hashedPasswordValue,
          lat: 0.0,
          long: 0.0
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  req.session.user = newUser;
  res.json(newUser)
})

router.put('/:id', async(req, res) => {
  const { id } = req.params
  const {  username, email, password  } = req.body
  let updatedUser = []
  try {
    updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
          username, 
          email, 
          password
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(updatedUser)
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params
  let deletedUser = []
  try {
    deletedUser = await prisma.user.delete({
      where: { id: parseInt(id) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(deletedUser)
})

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      // Find the user by username
      const user = await prisma.user.findFirst({ where: { username: username } });
  
      if (!user) {
        return res.status(401).json({ error: 'Username does not exist' });
      } 
  
      // Compare the password
      const isValidPassword = await bcrypt.compare(password, user.password);
  
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Invalid password' });
      }
  
      // Set the user in the session
      req.session.user = user;
  
      // Return the user data in the response
      res.json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
});

router.patch('/location', async(req, res) => {
  const {  id, lat, long  } = req.body
  let updatedUser = []
  try {
    updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        lat,
        long
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(updatedUser)
})

const retrieveDataForRecommendation = async (user) => {
  let idEventsAttending = [];
  let idEventsCommented = [];
  let totalDistanceUserToEvent = 0;
  let categoriesEventsAttending = [];
  // Get the events that our user is attending
  const attendance = await prisma.attendance.findMany({
    where: { 
      userAttending: user.username
    }
  })
  attendance.map((d) => 
    idEventsAttending.push(d.eventId)
  )

  const eventsAttending = await prisma.event.findMany({
    where: {
      id: { in: idEventsAttending}
    }
  })
  // --------------------------------------------
  // Get the categories of the events that the user is attending
  eventsAttending.map((e) => 
    categoriesEventsAttending.push(e.category)
  )
  // ----------------------------------------------
  // Get current date (https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript)
  var today = new Date();
  // ---------------------------------------------------------------------------
  // Get the mean distance that our user is willing to travel for an event
  let eventDate = new Date();
  let dateDifference = 0
  let numberOfEventsAttending = 0
  let meanDistanceTraveledUser = 0
  eventsAttending.map((e) => {
    eventDate = new Date(e.date)
    dateDifference =  ( ((eventDate.getTime() - today.getTime()) / 1000) / 604800 ) 
    // Only count events that are recent (2 months ago)
    if (dateDifference > -8) {
      totalDistanceUserToEvent = ( ((e.lat - user.lat)**2 + (e.long - user.long)**2)**.5 ) + totalDistanceUserToEvent
      numberOfEventsAttending = numberOfEventsAttending + 1
    }
  })
  if (numberOfEventsAttending > 0) meanDistanceTraveledUser = totalDistanceUserToEvent/numberOfEventsAttending
  // -------------------------------------------------------------------------------
  // Get the events that are nearby (square with side = 28 miles)
  const eventsNear = await prisma.event.findMany({
    where: { 
      lat: {
        gt: user.lat - 0.2 - meanDistanceTraveledUser,
        lt: user.lat + 0.2 + meanDistanceTraveledUser
      },
      long: {
        gt: user.long - 0.2 - meanDistanceTraveledUser, 
        lt: user.long + 0.2 + meanDistanceTraveledUser
      },
      id: { not: {in: idEventsAttending}},
      date: {
        gt: today
      }
    }
  })
  // ------------------------------------------------
  // Get the id's of the events the user has commented on & how many comments the user has
  const userComments = await prisma.comment.findMany({
    where: { 
      userPosting: user.username
    }
  })
  const totalComments = userComments.length
  userComments.map((e) => {
    idEventsCommented.push(e.eventId)
  })
  // ------------------------------------------------
  // Get attendance
  const eventsAttendance = await prisma.attendance.findMany()
  // ------------------------------------------------
  // Get the users that are active (registered for at least 1 event)
  let usersRegisteredForAnEvent = [];
  eventsAttendance.map((e) => {
    usersRegisteredForAnEvent.push(e.userAttending)
  })
  const activeUsers = await prisma.user.findMany({
    where: {
      username: { in: usersRegisteredForAnEvent}
    }
  })
  //-----------------------------------------------------
  
  return ([activeUsers, eventsAttendance, totalComments, eventsNear, meanDistanceTraveledUser, categoriesEventsAttending, idEventsCommented, numberOfEventsAttending])
}

const getDateScore = (e) => {
  // This function follows the formula given by the Capstone Project Plan
  var today = new Date();
  eventDate = new Date(e.date)
  dateDifference =  ( ((eventDate.getTime() - today.getTime()) / 1000) / 604800 ) 
  let dateScore = 1 / dateDifference
  return (dateScore)
}

const getCategoryScore = (e,categoriesEventsAttending) => {
  // This function follows the formula given by the Capstone Project Plan
  countOfApperances = 0
  let categoryScore = 0
  for (let i = 0; i < categoriesEventsAttending.length; i++) {
    if (categoriesEventsAttending[i] == e.category){
      countOfApperances = countOfApperances + 1
    }
  }
  if (categoriesEventsAttending.length != 0) categoryScore = (countOfApperances)/(categoriesEventsAttending.length)
  return (categoryScore)
}

const getDistanceScore = (e,user,meanDistanceTraveledUser) => {
  // This function follows the formula given by the Capstone Project Plan
  let distanceScore = 0
  let distanceEventToUser = ( ((e.lat - user.lat)**2 + (e.long - user.long)**2)**.5 )

  if ((meanDistanceTraveledUser - distanceEventToUser) > 0 && distanceEventToUser != 0){
    distanceScore = ((1 / (meanDistanceTraveledUser - distanceEventToUser)) + (1/distanceEventToUser))/2
  } else if ((meanDistanceTraveledUser - distanceEventToUser ) < 0 && distanceEventToUser != 0) {
    distanceScore = ((1 / (distanceEventToUser - meanDistanceTraveledUser)) + (1/distanceEventToUser))/2
  }
  else {
    distanceScore = 1
  }

  return (distanceScore)
}

const getCommentScore = (e,idEventsCommented,totalComments) => {
  // This function follows the formula given by the Capstone Project Plan
  countOfCommentsInEvent = 0
  for (let i = 0; i < totalComments; i++) {
    if (idEventsCommented[i] == e.id){
      countOfCommentsInEvent = countOfCommentsInEvent + 1
    }
  }
  if (totalComments != 0) {
    commentScore = (countOfCommentsInEvent)/(totalComments)
  } else {
    commentScore = 0
  }
}

const getEventsScore = async (activeUsers, eventsAttendance, totalComments, eventsNear, meanDistanceTraveledUser, categoriesEventsAttending, user, idEventsCommented, numberOfEventsAttending) => {
  let idRecommendedEvents = [];
  let scoreRecommendedEvents = [];
  let dateScore = 0
  let categoryScore = 0
  let distanceScore = 0
  let totalScore = 0
  let commentScore = 0
  let eventAttendanceCount = 0
  // userExperience is de Quantity of events a user has registered for, this, helps us recommend more popular
  // events to newer users. The higher the newer the user is
  let userExperience = 4
  if (numberOfEventsAttending > 3) userExperience = 2
  else if (numberOfEventsAttending > 5) userExperience = 1
  //------------------------------------------------------------------

  eventsNear.map((e) => {
    eventAttendanceCount = 0
    eventsAttendance.map((a) => {
      if (a.eventId == e.id) eventAttendanceCount = eventAttendanceCount + 1
    })
    // Date Score -----------------------------------------------------------------------------------------------------------
    dateScore = getDateScore(e)
    // ------------------------------------------------------------------------------------------------------------------------
    // Category Score -----------------------------------------------------------------------------------------------------------
    categoryScore = getCategoryScore(e,categoriesEventsAttending)
    // ------------------------------------------------------------------------------------------------------------------------
    // Distance Score -----------------------------------------------------------------------------------------------------------
    distanceScore = getDistanceScore(e,user,meanDistanceTraveledUser)
    // -------------------------------------------------------------------------------------------------------------------------
    // Comments Score -----------------------------------------------------------------------------------------------------------
    commentScore = getCommentScore(e,idEventsCommented,totalComments)
    // ------------------------------------------------------------------------------------------------------------------------
    // Popularity Score -----------------------------------------------------------------------------------------------------------
    popularityScore = 0
    if (activeUsers.length != 0) popularityScore = eventAttendanceCount/(activeUsers.length)
    // ------------------------------------------------------------------------------------------------------------------------
    // Total Score -----------------------------------------------------------------------------------------------------------
    totalScore = dateScore + categoryScore + distanceScore + commentScore + userExperience*popularityScore
    // -------------------------------------------------------------------------------------------------------------------------

    idRecommendedEvents.push(e.id)
    scoreRecommendedEvents.push(totalScore)
  })

  return ([idRecommendedEvents, scoreRecommendedEvents])
}


const recommendTenEvents = async (user) => {
  // Retrieve Necesary data to calculate the event scores
  const [activeUsers, eventsAttendance, totalComments, eventsNear, meanDistanceTraveledUser, categoriesEventsAttending,idEventsCommented, numberOfEventsAttending] = await retrieveDataForRecommendation(user)
  //------------------------------------------------------
  // Calculate the event scores
  let [idRecommendedEvents, scoreRecommendedEvents] = await getEventsScore(activeUsers, eventsAttendance, totalComments, eventsNear, meanDistanceTraveledUser, categoriesEventsAttending, user, idEventsCommented, numberOfEventsAttending)
  //------------------------------------------------------
  // Sort events by score --------------------------------
  var list = [];
  for (var j = 0; j < idRecommendedEvents.length; j++) {
      list.push({'id': idRecommendedEvents[j], 'score': scoreRecommendedEvents[j]});
  }

  list.sort(function(a, b) {
      return ((a.score < b.score) ? 1 : ((a.score == b.score) ? 0 : -1));
  });

  idRecommendedEvents = []

  for (var k = 0; k < list.length; k++) {
    if (k < 10) idRecommendedEvents.push(list[k].id)
  }
  // ------------------------------------------------------------------------------------
  // Search for the events
  const recommendedEvents = await prisma.event.findMany({
    where: {
      id: { in: idRecommendedEvents}
    }
  })
  //------------------------------------------------------

  return (recommendedEvents)
}

router.get('/recommendedEvents/:userId', async (req, res) => {
  const { userId } = req.params
  let user = []
  let recommendedEvents = []
  
  // Get the current user
  try {
    user = await prisma.user.findFirst({
      where: { id: parseInt(userId) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  // ----------------------------------------
  try {
    recommendedEvents = await recommendTenEvents(user)
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  
  res.json(recommendedEvents)
})

router.patch('/cellphone', async(req, res) => {
  const {  id, cellphoneNumber  } = req.body
  let updatedUser = []
  try {
    updatedUser = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        cellphoneNumber: cellphoneNumber
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(updatedUser)
})

module.exports = router