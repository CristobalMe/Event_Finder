const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  let events = []
  try {
    events = await prisma.event.findMany()
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(events)
})

router.post('/', async (req, res) => {
  const {  rating, location, name, duration, description, image, category, userId, date, time ,lat, long } = req.body
  let newEvent = []
  const floatLat = parseFloat(lat);
  const floatLong = parseFloat(long);
  const dateTime = new Date(date)
  try {
    newEvent = await prisma.event.create({
      data: {
        rating, 
        location, 
        name, 
        duration, 
        description, 
        image,
        category,
        userId, 
        date: dateTime,
        time,
        lat: floatLat, 
        long: floatLong
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
    
  res.json(newEvent)
})

router.patch('/:id', async(req, res) => {
  const { id } = req.params
  const {  location, lat, long, duration, description, image, date, time  } = req.body
  const dateTime = new Date(date)
  let updatedEvent = []
  try {
    updatedEvent = await prisma.event.update({
      where: { id: parseInt(id) },
      data: {
        location,
        lat: parseFloat(lat),
        long: parseFloat(long),
        duration, 
        description, 
        image, 
        date: dateTime,
        time
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(updatedEvent)
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params
  let deletedEvent = []
  try {
    deletedEvent = await prisma.event.delete({
      where: { id: parseInt(id) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(deletedEvent)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  let event = []
  try {
    event = await prisma.event.findFirst({
      where: { id: parseInt(id) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(event)
})

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params
  let event = []
  try {
    event = await prisma.event.findMany({
      where: { userId: parseInt(userId) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(event)
})

router.get('/attending/:userAttending', async (req, res) => {
  const { userAttending } = req.params
  let idEventsAttending = [];
  let attendance = []
  try {
    attendance = await prisma.attendance.findMany({
      where: { 
        userAttending: userAttending
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  attendance.map((d) => 
    idEventsAttending.push(d.eventId)
  )

  const events = await prisma.event.findMany({
    where: {
      id: { in: idEventsAttending}
    }
  })
  res.json(events)
})

router.get('/category/:eventCategory', async (req, res) => {
  const {  eventCategory  } = req.params
  let events = []
  try {
    events = await prisma.event.findMany({
      where: { category: eventCategory }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(events)
})

// To Do:
// Add slider to modify distance
router.get('/nearby/user/:latUser/:longUser', async (req, res) => {
  const {  latUser, longUser  } = req.params
  let events = []
  try {
    events = await prisma.event.findMany({
      where: { 
        lat: {
          gt: parseFloat(latUser) - 0.1, // 7 miles
          lt: parseFloat(latUser) + 0.1 // 7 miles
        },
        long: {
          gt: parseFloat(longUser) - 0.1, // 7 miles
          lt: parseFloat(longUser) + 0.1 // 7 miles
        }
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(events)
})

module.exports = router