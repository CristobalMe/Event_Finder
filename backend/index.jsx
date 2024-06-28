const express = require('express')
const app = express()
const PORT = 3000


app.get('/', (req, res) => {
    res.send('Welcome to my app!')
})

app.get('/sample-path', (req, res) => {
    res.send('This is a sample response.')
})




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

