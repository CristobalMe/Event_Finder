const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');

router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post('/', async (req, res) => {
  const {  username, email, password  } = req.body

  const existingUser = await prisma.user.findFirst({ where: { username: username } });
  if (existingUser) {
    return res.status(400).json({ error: 'Username already exists' });
  }

  if (username.includes(null)){
    return res.status(400).json({ error: 'Username can not contain "null"' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const hashedPasswordValue = String(hashedPassword);
  
  const newUser = await prisma.user.create({
    data: {
        username, 
        email, 
        password: hashedPasswordValue,
        lat: 0.0,
        long: 0.0
    }
  })

  req.session.user = newUser;

  res.json(newUser)
})

router.put('/:id', async(req, res) => {
  const { id } = req.params
  const {  username, email, password  } = req.body

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
        username, 
        email, 
        password
    }
  })
  res.json(updatedUser)
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params

  const deletedUser = await prisma.user.delete({
    where: { id: parseInt(id) }
  })
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

  const updatedUser = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      lat,
      long
    }
  })
  res.json(updatedUser)
})

const recommendTenEvents = async (user) => {
  let idRecommendedEvents = [];
  let scoreRecommendedEvents = [];
  let categoriesEventsAttending = [];
  let idEventsAttending = [];
  let idEventsCommented = [];
  let totalDistanceUserToEvent = 0;

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
  // Get the mean distance that our user is willing to travel for an event
  eventsAttending.map((e) => 
    totalDistanceUserToEvent = ( ((e.lat - user.lat)**2 + (e.long - user.long)**2)**.5 ) + totalDistanceUserToEvent
  )
  let numberOfEventsAttending = Object.keys(eventsAttending).length
  let meanDistanceTraveledUser = totalDistanceUserToEvent/numberOfEventsAttending
  // -------------------------------------------------------------------------------
  // Get the events that are nearby (square with side = 28 miles)
  const eventsNear = await prisma.event.findMany({
    where: { 
      lat: {
        gt: user.lat - 0.2,
        lt: user.lat + 0.2
      },
      long: {
        gt: user.long - 0.2, 
        lt: user.long + 0.2 
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
  let totalComments = 0
  userComments.map((e) => {
    idEventsCommented.push(e.eventId)
    totalComments = totalComments + 1
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
  // ------------------------------------------------
  // Get current date (https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript)
  var today = new Date();
  // ---------------------------------------------------------------------------
  // Calculate the score for each event ****************************************************************************************
  let eventDate = new Date();
  let dateDifference = 0
  let dateScore = 0
  let countOfApperances = 0
  let categoryScore = 0
  let distanceEventToUser = 0
  let distanceScore = 0
  let totalScore = 0
  let countOfCommentsInEvent = 0
  let commentScore = 0
  let eventAttendance = 0
  let popularityScore = 0

  eventsNear.map((e) => {
    eventAttendance = 0
    eventsAttendance.map((a) => {
      if (a.eventId == e.id) eventAttendance = eventAttendance + 1
    })
    // Date Score -----------------------------------------------------------------------------------------------------------
    eventDate = new Date(parseInt(e.date.slice(0, 2)) + '/' + parseInt(e.date.slice(3, 5)) + '/' + parseInt(e.date.slice(6, 10)))
    dateDifference =  ( ((eventDate.getTime() - today.getTime()) / 1000) / 604800 ) 

    if (dateDifference !=0 ){
      dateScore = 1 / dateDifference
    } else{
      dateScore = 1
    }
    
    // ------------------------------------------------------------------------------------------------------------------------
    // Category Score -----------------------------------------------------------------------------------------------------------
    countOfApperances = 0
    for (let i = 0; i < categoriesEventsAttending.length; i++) {
      if (categoriesEventsAttending[i] == e.category){
        countOfApperances = countOfApperances + 1
      }
    }
    if (categoriesEventsAttending.length != 0) {
      categoryScore = (countOfApperances)/(categoriesEventsAttending.length)
    } else {
      categoryScore = 0
    }
    // ------------------------------------------------------------------------------------------------------------------------
    // Distance Score -----------------------------------------------------------------------------------------------------------
    distanceEventToUser = ( ((e.lat - user.lat)**2 + (e.long - user.long)**2)**.5 )

    if ((meanDistanceTraveledUser - distanceEventToUser) > 0){
      distanceScore = 1 / (meanDistanceTraveledUser - distanceEventToUser)
    } else if ((meanDistanceTraveledUser - distanceEventToUser) < 0) {
      distanceScore = 1 / (distanceEventToUser - meanDistanceTraveledUser)
    }
    else {
      distanceScore = 1
    }
    // -------------------------------------------------------------------------------------------------------------------------
    // Comments Score -----------------------------------------------------------------------------------------------------------
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
    // ------------------------------------------------------------------------------------------------------------------------
    // Popularity Score -----------------------------------------------------------------------------------------------------------
    popularityScore = 0
    if (activeUsers.length != 0) popularityScore = eventAttendance/(activeUsers.length)
    // ------------------------------------------------------------------------------------------------------------------------
    // Total Score -----------------------------------------------------------------------------------------------------------
    totalScore = dateScore + categoryScore + distanceScore + commentScore + 4*popularityScore
    // -------------------------------------------------------------------------------------------------------------------------
    if (!idEventsAttending.includes(e.id)){
      console.log(popularityScore)
      idRecommendedEvents.push(e.id)
      scoreRecommendedEvents.push(totalScore)
    }
  })
  // *****************************************************************************************************************************
  // Sort events by score --------------------------------------------------------------
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
  const recommendedEvents = await prisma.event.findMany({
    where: {
      id: { in: idRecommendedEvents}
    }
  })

  return (recommendedEvents)
}

router.get('/recommendedEvents/:userId', async (req, res) => {
  const { userId } = req.params
  

  // Get the current user
  const user = await prisma.user.findFirst({
    where: { id: parseInt(userId) }
  })
  // ----------------------------------------

  const recommendedEvents = await recommendTenEvents(user)
  
  res.json(recommendedEvents)
})

module.exports = router