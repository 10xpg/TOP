const db = require('../db/queries')
const bcrypt = require('bcryptjs')
const passport = require('passport')
const validator = require('../utils/validators')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')
const authMiddleware = require('../utils/passport')

const createUserGet = [
  // authMiddleware.checkIsLoggedIn(),
  asyncHandler((req, res) => {
    res.render('register')
  })
]

const createUserPost = [
  validator.validateRegister,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    console.log(errors)
    if (!errors.isEmpty()) {
      return res.status(400).render('register', {
        errors: errors.array()
      })
    }
    const { firstname, lastname, username, password1 } = req.body
    const salt = await bcrypt.genSalt(10)
    const pwdhash = await bcrypt.hash(password1, salt)
    await db.createUser(username, firstname, lastname, pwdhash, salt)
    res.redirect('/')
  })
]

const authenticateUserGet = [
  // authMiddleware.checkIsLoggedIn(),
  asyncHandler(async (req, res) => {
    res.render('login')
  })
]

const authenticateUserPost = [
  validator.validateLogin,
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('login', {
        errors: errors.array()
      })
    }
    next()
  },
  passport.authenticate('local', {
    successRedirect: '/message',
    failureRedirect: '/'
  })
]

const logoutUser = asyncHandler((req, res, next) => {
  req.logout((err) => {
    if (err) return next(err)
  })
  res.redirect('/user/login')
})

const upgradeStatus = asyncHandler((req, res) => {
  res.render('backroom')
})

const promoteToMember = [
  validator.validateMemberReq,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('backroom', {
        errors: errors.array()
      })
    }
    const { username, secretcode } = req.body
    const memberSecret = await db.getMemberSecret()

    let bool = false
    if (secretcode === memberSecret.secret) {
      bool = true
      await db.upgradeToMember(bool, username)
      res.redirect('/')
    } else {
      await db.upgradeToMember(bool, username)
      res.status(403).render('partials/unapproved')
    }
  })
]

const promoteToAdmin = [
  validator.validateAdminReq,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('backroom', { errors: errors.array() })
    }
    const { username, passcode } = req.body
    const adminSecret = await db.getAdminSecret()

    let bool = false
    if (passcode === adminSecret.secret) {
      bool = true
      await db.upgradeToAdmin(bool, username)
      res.redirect('/')
    } else {
      await db.upgradeToAdmin(bool, username)
      res.status(403).render('partials/unapproved')
    }
  })
]

module.exports = {
  createUserGet,
  createUserPost,
  authenticateUserGet,
  authenticateUserPost,
  logoutUser,
  upgradeStatus,
  promoteToMember,
  promoteToAdmin
}
