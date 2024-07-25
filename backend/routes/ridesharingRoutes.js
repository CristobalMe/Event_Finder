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

const getAttendingRideshares = async (userAttending) => {
  let attendance = []
  let ridesharingId = []

  // Get all the attendances in wich we have registered preferences
  try {
      attendance = await prisma.attendance.findMany({
        where: {
          // Check logic (Change for OR)
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
  return(ridesharingId)
}


// here
// This reccommends posible ridesharings to users without car 
router.get('/user/notDriving/suggestions/:userAttending', async (req, res) => {
  let ridesharing = []
  let attendance = []
  let ridesharingId = []
  let eventId = []
  const { userAttending } = req.params
  let ridesharingAttending = []

  // get ridesharingAttending
  ridesharingAttending = await getAttendingRideshares(userAttending)
  // -------------------------

  

  // recommend ridesharings
  try {
      attendance = await prisma.attendance.findMany({
        where: { 
          userAttending: userAttending,
          ridesharingUserPreferencesForEvent: {isNot: null}
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
      eventId.push(a.eventId)
  })

  try {
    attendance = await prisma.attendance.findMany({
      where: { 
        eventId: {in: eventId},
        userAttending: {not: userAttending},
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

  // Fix to display only rideshares with more than the seats needed
  // ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.findMany({
  //   where: {
  //     id: {in: ridesharingId}
  //   }
  // })
  // -------------------------------------------

  try {
      ridesharing = await prisma.ridesharing.findMany({
          where: {
            AND: [
              {id: { not: { in: ridesharingAttending}}},
              {attendanceId: { in: ridesharingId }},
              {seatsAvailable: { gt: 1 }}
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
  // -------------------------------------------------
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

router.get('/ridesharingUserPreferencesForEvent', async (req, res) => {
    let ridesharingUserPreferencesForEvent = []
    try {
        ridesharingUserPreferencesForEvent = await prisma.ridesharingUserPreferencesForEvent.findMany()
    } catch (error) {
      console.log(error);
  
      return res.status(500).json({
        success: false,
        message: error.message,
      });
    }
    res.json(ridesharingUserPreferencesForEvent)
})

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

module.exports = router