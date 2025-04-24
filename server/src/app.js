require('dotenv').config()
const express = require('express')

const PORT = process.env.EXPRESS_PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', (req, res) => res.json({ message: 'Welcome to blogapi' }))

app.listen(PORT, () => console.log(`app is running on port ${PORT}...`))
