const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.get('/books', async (req, res) => {
    const books = await prisma.book.findMany()
    res.json(books)
})

app.post('/books', async (req, res) => {
    const { title, author, genre } = req.body
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre
      }
    })
    res.json(newBook)
})

app.put('/books/:id', async (req, res) => {
    const { id } = req.params
    const { title, author, genre } = req.body
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: {
        title,
        author,
        genre
      }
    })
    res.json(updatedBook)
})


app.delete('/books/:id', async (req, res) => {
    const { id } = req.params
    const deletedBook = await prisma.book.delete({
      where: { id: parseInt(id) }
    })
    res.json(deletedBook)
})