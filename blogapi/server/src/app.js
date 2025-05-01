require('dotenv').config()
require('./config/passport')
const express = require('express')
const usersRoutes = require('./routes/users')
const postsRoutes = require('./routes/posts')

const PORT = process.env.EXPRESS_PORT

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use((req, res, next) => {
  console.log(req.user)
  next()
})

app.get('/', (req, res) => res.json({ message: 'Welcome to blogapi' }))
app.use('/users', usersRoutes)
app.use('/posts', postsRoutes)

app.listen(PORT, () => console.log(`app is running on port ${PORT}...`))
