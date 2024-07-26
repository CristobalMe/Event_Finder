const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.post('/withCar', async (req, res) => {
  const {  seatsAvailable, arrivalTime, departingLat, departingLong, user, event } = req.body
  let newRidesharing = []
  const arrivalTimeDateTime = new Date(arrivalTime)

  attendance = await prisma.attendance.findMany({
    where: { 
      userAttending: user.username,
      eventId: parseInt(event.id)
    }
  })
  try {
    newRidesharing = await prisma.ridesharing.create({
      data: {
        seatsAvailable: seatsAvailable,
        departingTime: event.date,
        departingLat: departingLat,
        departingLong: departingLong,
        arrivalTime: arrivalTimeDateTime,
        attendanceId: parseInt(attendance[0].id),
        eventName: event.name
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
    
  res.json(newRidesharing)
})

router.post('/withoutCar', async (req, res) => {
    const {  numberOfSeatsNeeded, preferedArrivalTime, user, event } = req.body
    let newRidesharing = []
    const arrivalTimeDateTime = new Date(preferedArrivalTime)
  
    attendance = await prisma.attendance.findMany({
      where: { 
        userAttending: user.username,
        eventId: parseInt(event.id)
      }
    })
    try {
      newRidesharing = await prisma.ridesharingUserPreferencesForEvent.create({
        data: {
          numberOfSeatsNeeded: numberOfSeatsNeeded,
          preferedArrivalTime: arrivalTimeDateTime,
          attendanceId: parseInt(attendance[0].id)
        }
      })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
      
    res.json(newRidesharing)
})

router.get('/user/driving/:userAttending', async (req, res) => {
    let ridesharing = []
    let attendance = []
    let ridesharingId = []
    const { userAttending } = req.params

    try {
        attendance = await prisma.attendance.findMany({
          where: { 
            userAttending: userAttending,
            ridesharingDriver: {isNot: null}
        }
        })
      } catch (error) {
        console.log(error);
    
        return res.status(500).json({
          success: false,
          message: error.message,
        });
    }
    attendance.map((a) => {
        ridesharingId.push(a.id)
    })
    try {
        ridesharing = await prisma.ridesharing.findMany({
            where: {
                attendanceId: { in: ridesharingId }
            }
        })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    res.json(ridesharing)
})

router.get('/user/notDriving/:userAttending', async (req, res) => {
  let ridesharing = []
  let attendance = []
  let ridesharingId = []
  const { userAttending } = req.params

  // Get all the attendances in wich we have registered preferences
  try {
      attendance = await prisma.attendance.findMany({
        where: { 
          userAttending: userAttending,
          ridesharingUserPreferencesForEvent: {isNot: null},
          ridesharingId: {gt: 0}
      }
      })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
  // -------------------------------------------------------------
  // Get the ids 
  attendance.map((a) => {
      ridesharingId.push(a.ridesharingId)
  })
  // ---------------------------------
  try {
      ridesharing = await prisma.ridesharing.findMany({
          where: {
            id: { in: ridesharingId }
          }
      })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(ridesharing)
})

// Check if a user is already registered
router.get('/isRegistered/:userAttending/:eventId', async (req, res) => {
  let ridesharing = []
  let attendance = []
  let ridesharingId = []
  let ridesharingUserPreferencesForEvent = []
  const { userAttending, eventId } = req.params

  try {
      attendance = await prisma.attendance.findMany({
        where: { 
          OR:[
            {
              userAttending: userAttending,
              eventId: parseInt(eventId),
              ridesharingDriver: {isNot: null}
            },
            {
              userAttending: userAttending,
              eventId: parseInt(eventId),
              ridesharingUserPreferencesForEvent: {isNot: null}
            }
          ]
      }
      })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
  attendance.map((a) => {
      ridesharingId.push(a.id)
  })
  try {
      ridesharing = await prisma.ridesharing.findMany({
          where: {
              attendanceId: { in: ridesharingId }
          }
      })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  try {
    ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.findMany({
          where: {
              attendanceId: { in: ridesharingId }
          }
      })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(ridesharingUserPreferencesForEvent.concat(ridesharing))
})

// Modify the attendance
router.patch('/attendance/:user', async(req, res) => {
  const {  user  } = req.params
  // if isDeleting = 0, the user wants to delete the event, else is 1
  const { ridesharingId, eventName, isDeleting } = req.body
  let event = []
  let attendance = []
  let ridesharingUserPreferencesForEvent = []
  let attendanceId = 0
  let ridesharing = []

  try {
    event = await prisma.event.findFirst({
      where: { name: eventName}
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  try {
    attendanceId = await prisma.attendance.findFirst({
      where: { 
        eventId: parseInt(event.id),
        userAttending: user
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  //find the preferences related
  try{
    ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.findUniqueOrThrow({
      where: {
        attendanceId: attendanceId.id
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  
  // If the user is unregistering
  if (isDeleting == 0){
    attendance = await prisma.attendance.update({
      where: { 
        id: attendanceId.id
      },
      data: {
        ridesharingId: null
      }
    })


    ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.update({
      where: { id:ridesharingUserPreferencesForEvent.id },
      data: {
        ridesharingId: null
      }
    })

    ridesharing = await prisma.ridesharing.findFirst({
      where: { id: ridesharingId }
    })

    ridesharing = await prisma.ridesharing.update({
      where: { id: ridesharingId },
      data: {
        seatsAvailable: ridesharing.seatsAvailable + ridesharingUserPreferencesForEvent.numberOfSeatsNeeded
      }
    })
    
  } else {
    ridesharing = await prisma.ridesharing.findFirst({
      where: { id: ridesharingId }
    })

    if (ridesharing.seatsAvailable >= ridesharingUserPreferencesForEvent.numberOfSeatsNeeded){
      attendance = await prisma.attendance.update({
        where: { 
          id: attendanceId.id
        },
        data: {
          ridesharingId: parseInt(ridesharingId)
        }
      })
  
      ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.update({
        where: { id:ridesharingUserPreferencesForEvent.id },
        data: {
          ridesharingId: parseInt(ridesharingId)
        }
      })
  
      ridesharing = await prisma.ridesharing.update({
        where: { id: ridesharingId },
        data: {
          seatsAvailable: ridesharing.seatsAvailable - ridesharingUserPreferencesForEvent.numberOfSeatsNeeded
        }
      })
    }
  }

  res.json(attendance)
})

router.get('/:rideshareId', async (req, res) => {
  const {  rideshareId  } = req.params
  let rideshare = []
  try {
      rideshare = await prisma.ridesharing.findMany({
        where: {
          id: parseInt(rideshareId)
        }
      })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(rideshare)
})

router.get('/preferences/:rideshareId', async (req, res) => {
  const {  rideshareId  } = req.params
  let preferences = []
  try {
    preferences = await prisma.ridesharingUserPreferencesForEvent.findMany({
        where: {
          ridesharingId: parseInt(rideshareId)
        }
      })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(preferences)
})

// Modify rideshare
router.patch('/modify/coordinates/datetime', async(req, res) => {
  const { ridesharingId, newLat, newLong, newDateTime } = req.body
  let ridesharing = []
  const newDate = new Date(newDateTime)
  
  try {
      ridesharing = await prisma.ridesharing.update({
      where: { 
        id: parseInt(ridesharingId)
      },
      data: {
        departingLat: parseFloat(newLat),
        departingLong: parseFloat(newLong),
        arrivalTime: newDate
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(ridesharing)
})

// Fetch distance using the API: Distance Matrix
const fetchDistance = async (destination, origin) => {
  // Import the API key
  const apiKey = process.env.MAPS_API_KEY;
  // distance = Infinity to work with unreacheable destinations
  let distance = Infinity
  // origin == destination is because of a bug when selecting the same location with the api
  if (origin == destination) distance = 0

  // Fetch distance from origin to destination
  await fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.lat}%2C${destination.long}&origins=${origin.lat}%2C${origin.long}&key=${apiKey}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.rows[0].elements[0].distance.value) distance = parseInt(data.rows[0].elements[0].distance.value)/1000
      })
      .catch((error) => console.error('Error fetching:', error))
  return (distance)
}

// Get recommendations
router.get('/recommendations/:eventId/:userId', async (req, res) => {
  const { eventId, userId } = req.params
  let rideshares = []
  let attendance = []
  let atendanceId = []

  let event = []

  let distanceRideshareToUser = []
  let differenceBetweenDates = []

  let userToRecommend = []
  let userToRecommendAttendance = []
  let userToRecommendPreferences = []
  // Part 1 ***********************************************************
  // Find our user data
  try {
    userToRecommend = await prisma.user.findUnique({
      where: { 
        id: parseInt(userId)
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  userToRecommendAttendance = await prisma.attendance.findFirst({
    where: { 
      eventId: parseInt(eventId),
      userAttending: userToRecommend.username,
    }
  })

  userToRecommendPreferences = await prisma.ridesharingUserPreferencesForEvent.findUnique({
    where: { 
      attendanceId: userToRecommendAttendance.id
    }
  })
  // -----------------------------------------------
  // Find the event data
  event = await prisma.event.findMany({
    where: { 
      id: parseInt(eventId)
    }
  })
  // ------------------------------------------------
  // Find the "attendance" of the users that are driving to the event
  try {
      attendance = await prisma.attendance.findMany({
        where: { 
          eventId: parseInt(eventId),
          ridesharingDriver: {isNot: null}
        }
      })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
  // ------------------------------------------------
  // Store the attendance ids in an array
  attendance.map((a) => {
    atendanceId.push(a.id)
  })
  // ------------------------------------------------
  // Search the rideshares
  try {
    rideshares = await prisma.ridesharing.findMany({
        where: {
            attendanceId: { in: atendanceId }
        }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  // -----------------------------------------------
  // Part 1 ***********************************************************

  // Part 2 ***********************************************************
  let rideshareScore = []

  // We store the distance between rideshare and user
  let distance = 0
  let distanceEventUser = 0
  // Distance between event and user
  distanceEventUser = await fetchDistance({lat: event[0].lat, long: event[0].long}, {lat: userToRecommend.lat, long: userToRecommend.long})

  await Promise.all(rideshares.map(async (rideshare) => {
    distance = await fetchDistance({lat: rideshare.departingLat, long: rideshare.departingLong}, {lat: userToRecommend.lat, long: userToRecommend.long})

    // We penalize diferences greater the distance to the event
    if (distance > distanceEventUser){
      distance = 1000000
    }
    distanceRideshareToUser.push(distance)
  }))
  // ----------------------------------------------
  // We calculate how different are the date that a user is departing and the date of the rideshare
  let difference = 0
  rideshares.map((rideshare) => {
    // Transform difference from ms to days
    difference = (((rideshare.arrivalTime - userToRecommendPreferences.preferedArrivalTime)**2)**.5) / 86400000

    if (difference > 1){
      // We penalize diferences greater than a day
      difference = 1000000
    }
    differenceBetweenDates.push(difference)
  })
  // ----------------------------------------------

  // We calculate the rideshareScore 
  let score = 0

  distanceRideshareToUser.map((distance, index) => {
    score = 1/distance + 1/differenceBetweenDates[index]
    // If we penalized the score, we assign it a negative score
    if (1/distance < 1/1000 || 1/differenceBetweenDates[index] < 1/1000) score = -1

    rideshareScore.push(score)
  })
  // ----------------------------------------------

  // Sort events by score --------------------------------
  var list = [];
  for (var j = 0; j < rideshareScore.length; j++) {
      // Only adding valid rideshareScores
      if (rideshareScore[j] > 0){
        list.push({'rideshare': rideshares[j], 'score': rideshareScore[j]});
      }
  }

  list.sort(function(a, b) {
      return ((a.score < b.score) ? 1 : ((a.score == b.score) ? 0 : -1));
  });

  recommendedRideshares = []

  for (var k = 0; k < list.length; k++) {
    if (k < 5) recommendedRideshares.push(list[k].rideshare)
  }
  // ------------------------------------------------------------------------------------

  // Part 2 ***********************************************************
  res.json(recommendedRideshares)
})

// Get the preferences of a user that has not registered to a group
router.get('/ridesharingUserPreferencesForEvent/:userAttending/:eventId', async (req, res) => {
  let preferences = null
  let attendance = []
  const { userAttending, eventId } = req.params

  try {
      attendance = await prisma.attendance.findFirst({
        where: { 
          userAttending: userAttending,
          eventId: parseInt(eventId)
      }
      })
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
  }
  if (attendance){
    try {
        preferences = await prisma.ridesharingUserPreferencesForEvent.findFirst({
            where: {
              attendanceId: attendance.id,
              ridesharingId: {equals: null}
            }
        })
    } catch (error) {
      console.log(error);

      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  }
  res.json(preferences)
})

module.exports = router