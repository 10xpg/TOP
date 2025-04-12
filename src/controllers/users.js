const db = require('../db/queries')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const validator = require('../utils/validators')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const authMiddleware = require('../utils/passport')

const createUserGet = [
  validator.validateRegister(),
  // authMiddleware.checkIsLoggedIn(),
  asyncHandler((req, res) => {
    res.render('register')
  })
]

const createUserPost = asyncHandler(async (req, res) => {
  console.log(req.body)
  const { firstname, lastname, username, password1 } = req.body
  const salt = await bcrypt.genSalt(10)
  const pwdhash = await bcrypt.hash(password1, salt)
  await db.createUser(username, firstname, lastname, pwdhash, salt)
  res.redirect('/')
})

const authenticateUserGet = [
  validator.validateLogin(),
  // authMiddleware.checkIsLoggedIn(),
  asyncHandler(async (req, res) => {
    res.render('login')
  })
]

const authenticateUserPost = [
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/'
  })
]

const logoutUser = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
  })
  res.redirect('/user/login')
}

module.exports = {
  createUserGet,
  createUserPost,
  authenticateUserGet,
  authenticateUserPost,
  logoutUser
}
