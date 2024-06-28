const express = require('express')
const router = express.Router()
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()


router.get('/', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

router.post('/', async (req, res) => {
  const {  username, email, password  } = req.body
  
  const newUser = await prisma.user.create({
    data: {
        username, 
        email, 
        password
    }
  })

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


module.exports = router
