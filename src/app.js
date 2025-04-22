require('dotenv').config()
require('./utils/passport')
const express = require('express')
const session = require('express-session')
const path = require('path')
const passport = require('passport')
const prismaStore = require('../src/db/sessionstore')
const usersRouter = require('./routers/users')
const indexRouter = require('./routers/index')
const filesRouter = require('./routers/files')
const directoriesRouter = require('./routers/dirs')

const port = process.env.EXPRESS_PORT
const cookieSecret = process.env.COOKIE_SECRET

const ExpressSession = session({
  store: prismaStore,
  secret: cookieSecret,
  resave: false,
  cookie: { maxAge: 7 * 24 * 60 * 60 * 1000 },
  saveUninitialized: true
})

// -> Init Application
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
app.use('/users', usersRouter)
app.use('/files', filesRouter)
app.use('/directories', directoriesRouter)

app.listen(port, () => console.log(`express app listening on port: ${port} ...`))

// todo: add location for folder creation
// todo: add asynchandler and validator to users related routes and views(ie.forms)
