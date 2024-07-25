const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  let attendance = []
  try {
    attendance = await prisma.attendance.findMany()
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(attendance)
})

router.delete('/:eventId/:id', async(req, res) => {
  const { eventId, id } = req.params
  let deletedAttendance = []
  try {
    deletedAttendance = await prisma.attendance.delete({
      where: { 
          id: parseInt(id),
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
  res.json(deletedAttendance)
})

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params
  let attendance = []
  try {
    attendance = await prisma.attendance.findMany({
      where: { eventId: parseInt(eventId) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(attendance)
})

router.get('/user/:userAttending', async (req, res) => {
  const { userAttending } = req.params
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
  res.json(attendance)
})

router.post('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  let newAttendance = []
  try {
    newAttendance = await prisma.attendance.create({
      data: { 
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
  res.json(newAttendance)
})

router.get('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  let attendance = []
  try {
    attendance = await prisma.attendance.findMany({
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
  res.json(attendance)
})

router.delete('/user/:userAttending/:eventId', async (req, res) => {
  const { userAttending, eventId } = req.params
  let attendance = []
  try {
    attendance = await prisma.attendance.deleteMany({
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
  res.json(attendance)
})

router.post('/ridesharing/manyIds', async (req, res) => {
  const { ids } = req.body
  let attendance = []
  let usernames = []
  let usersData = []
  try {
    attendance = await prisma.attendance.findMany({
      where:{
        id: { in: ids }
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
    usernames.push(a.userAttending)
  })

  try {
    usersData = await prisma.user.findMany({
      where:{
        username: { in: usernames }
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }

  res.json(usersData)
})

module.exports = router