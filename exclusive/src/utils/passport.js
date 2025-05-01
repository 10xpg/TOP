const passport = require('passport')
const db = require('../db/queries')
const asyncHandler = require('express-async-handler')
const LocalStrategy = require('passport-local').Strategy
const { verifyPassword } = require('../utils/password')

const verifyCb = async (username, password, done) => {
  try {
    const user = await db.findUserByUsername(username)
    console.log(user)
    if (!user) return done(null, false, { message: 'Invalid username' })
    const match = await verifyPassword(password, user.pwdhash)
    if (!match) return done(null, false, { message: 'Invalid password' })
    return done(null, user)
  } catch (err) {
    return done(err)
  }
}

const strategy = new LocalStrategy(verifyCb)

passport.use(strategy)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser(async (userId, done) => {
  try {
    const user = await db.findUserByUserId(userId)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

const checkIsAuthenticated = asyncHandler((req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).render('partials/isauthenticated')
  } else {
    next()
  }
})

const checkIsAdmin = asyncHandler((req, res, next) => {
  if (req.isAuthenticated() && req.user.isadmin) {
    next()
  } else {
    res.status(401).render('partials/isadmin')
  }
})

const checkIsMember = asyncHandler((req, res, next) => {
  if (req.isAuthenticated() && req.user.ismember) {
    next()
  } else {
    res.status(401).render('partials/unapproved')
  }
})

const checkIsLoggedIn = asyncHandler((req, res, next) => {
  if (!req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/message')
  }
})

module.exports = { checkIsAuthenticated, checkIsAdmin, checkIsMember, checkIsLoggedIn }
