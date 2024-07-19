const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/', async (req, res) => {
  let comment = []
  try {
    comment = await prisma.comment.findMany()
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(comment)
})

router.post('/:eventId', async (req, res) => {
  const { eventId } = req.params
  const {  userPosting, comment  } = req.body
  let newComment = []
  try {
    newComment = await prisma.comment.create({
      data: {
          userPosting,
          eventId: parseInt(eventId),
          comment 
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(newComment)
})

router.put('/:eventId/:id', async(req, res) => {
  const { eventId, id } = req.params
  const {  userPosting, comment  } = req.body
  let updatedComment = []
  try {
    updatedComment = await prisma.comment.update({
      where: { 
          id: parseInt(id),
          eventId: parseInt(eventId)
      },
      data: {
          userPosting,
          eventId,
          comment
      }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(updatedComment)
})

router.delete('/:eventId/:id', async(req, res) => {
  const { eventId, id } = req.params
  let deletedComment = []
  try {
    deletedComment = await prisma.comment.delete({
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
  res.json(deletedComment)
})

router.get('/:eventId', async (req, res) => {
  const { eventId } = req.params
  let comments = []
  try {
    comments = await prisma.comment.findMany({
      where: { eventId: parseInt(eventId) }
    })
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
  res.json(comments)
})

module.exports = router