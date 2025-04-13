require('dotenv').config()
require('./utils/passport')
const express = require('express')
const session = require('express-session')
const path = require('path')
const pgStore = require('./db/sessionstore')
const passport = require('passport')
const userRouter = require('./routes/users')
const indexRouter = require('./routes/index')
const messageRouter = require('./routes/messages')

const cookieSecret = process.env.COOKIE_SECRET
const port = process.env.PORT
const PORT = port

const ExpressSession = session({
  store: pgStore,
  secret: cookieSecret,
  resave: false,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true
})

// -> initialize express app
const app = express()

// ->  Settings
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// ->  Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(ExpressSession)
app.use(passport.session())
app.use(express.static('public'))

app.use((req, res, next) => {
  console.log(req.session)
  console.log(req.user)
  next()
})

// ->  Routes
app.use('/', indexRouter)
app.use('/user', userRouter)
app.use('/message', messageRouter)

app.listen(PORT, () => console.log(`express app listening on port: ${PORT} ...`))
