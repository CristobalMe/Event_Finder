const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  const attendance = await prisma.attendance.findMany()
  res.json(attendance)
})

router.delete('/:eventId/:id', async(req, res) => {
  const { eventId, id } = req.params

  const deletedAttendance = await prisma.attendance.delete({
    where: { 
        id: parseInt(id),
        eventId: parseInt(eventId)
    }
  })
  res.json(deletedAttendance)
})

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params
  const attendance = await prisma.attendance.findMany({
    where: { eventId: parseInt(eventId) }
  })
  res.json(attendance)
})

router.get('/user/:userAttending', async (req, res) => {
  const { userAttending } = req.params
  const attendance = await prisma.attendance.findMany({
    where: { 
      userAttending: userAttending
    }
  })
  res.json(attendance)
})

router.post('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  const newAttendance = await prisma.attendance.create({
    data: { 
      userAttending: userAttending,
      eventId: parseInt(eventId)
    }
  })
  res.json(newAttendance)
})

router.get('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  const attendance = await prisma.attendance.findMany({
    where: { 
      userAttending: userAttending,
      eventId: parseInt(eventId)
    }
  })
  res.json(attendance)
})

router.delete('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  const attendance = await prisma.attendance.deleteMany({
    where: { 
      userAttending: userAttending,
      eventId: parseInt(eventId)
    }
  })
  res.json(attendance)
})

module.exports = router