const cors = require('cors')
const morgan = require('morgan');
const express = require('express')
const app = express()
const PORT = 3000


app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json())
app.use(morgan())

const eventRoutes = require("./routes/eventRoutes")
const userRoutes = require("./routes/userRoutes")


app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})

app.use('/event', eventRoutes)
app.use('/users', userRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

