const bcrypt = require('bcryptjs')
const passport = require('passport')
const db = require('../db/queries')
const asyncHandler = require('express-async-handler')

const authenticateUserGet = (req, res) => {
  res.render('login')
}

const authenticateUserPost = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/?err=login-failed'
})

const registerUserGet = async (req, res) => {
  res.render('register')
}

const registerUserPost = async (req, res) => {
  const { firstname, lastname, email, password1 } = req.body
  const salt = await bcrypt.genSalt(10)
  const pwdhash = await bcrypt.hash(password1, salt)
  await db.users.addUser(firstname, lastname, email, pwdhash)
  res.redirect('/')
}

const unauthUserGet = asyncHandler(async (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
    next()
  })
})

module.exports = {
  authenticateUserGet,
  authenticateUserPost,
  registerUserGet,
  registerUserPost,
  unauthUserGet
}
