const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const events = await prisma.event.findMany()
  res.json(events)
})

router.post('/', async (req, res) => {
  const {  rating, location, name, duration, description, image, category, userId, date, time ,lat, long } = req.body
  const floatLat = parseFloat(lat);
  const floatLong = parseFloat(long);
  
  const newEvent = await prisma.event.create({
    data: {
      rating, 
      location, 
      name, 
      duration, 
      description, 
      image,
      category,
      userId, 
      date, 
      time,
      lat: floatLat, 
      long: floatLong
    }
  })
  res.json(newEvent)
})

router.patch('/:id', async(req, res) => {
  const { id } = req.params
  const {  location, lat, long, duration, description, image, date, time  } = req.body

  const updatedEvent = await prisma.event.update({
    where: { id: parseInt(id) },
    data: {
      location,
      lat,
      long,
      duration, 
      description, 
      image, 
      date,
      time
    }
  })
  res.json(updatedEvent)
})

router.delete('/:id', async(req, res) => {
  const { id } = req.params

  const deletedEvent = await prisma.event.delete({
    where: { id: parseInt(id) }
  })
  res.json(deletedEvent)
})

router.get('/:id', async (req, res) => {
  const { id } = req.params
  const event = await prisma.event.findFirst({
    where: { id: parseInt(id) }
  })
  res.json(event)
})

router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params
  const event = await prisma.event.findMany({
    where: { userId: parseInt(userId) }
  })
  res.json(event)
})

router.get('/attending/user', async (req, res) => {
  const {  attending  } = req.body
  const events = await prisma.event.findMany({
    where: {
      id: { in: attending }
    }
  })
  res.json(events)
})

router.get('/category/:eventCategory', async (req, res) => {
  const {  eventCategory  } = req.params
  const events = await prisma.event.findMany({
    where: { category: eventCategory }
  })
  res.json(events)
})

// To Do:
// Add slider to modify distance
router.get('/nearby/user/:latUser/:longUser', async (req, res) => {
  const {  latUser, longUser  } = req.params
  const events = await prisma.event.findMany({
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
  res.json(events)
})

module.exports = router