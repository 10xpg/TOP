require('dotenv').config()
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const LocalStrategy = require('passport-local')
const passport = require('passport')
const db = require('../db/query')
const { verifyPassword } = require('../utils/password')

const SECRET = process.env.JWT_SECRET

// local strategy
const localVerifyCb = async (email, password, done) => {
  try {
    const user = await db.users.getUserByEmail(email)
    console.log(user)
    if (!user) return done(null, false, { message: 'Invalid email' })

    const isPwdMatch = verifyPassword(password, user.hashedpwd)
    if (!isPwdMatch) return done(null, false, { message: 'Invalid password' })

    return done(null, user, { message: 'Login successful' })
  } catch (err) {
    return done(err)
  }
}

const localStrategy = new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  localVerifyCb
)

passport.use('login', localStrategy)

// jwt strategy

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: SECRET
}

const jwtVerifyCb = async (payload, done) => {
  const user = await db.users.getUserById(payload.sub)
  if (!user) return done(null, false)
  return done(null, user)
}

const jwtStrategy = new JwtStrategy(options, jwtVerifyCb)
passport.use(jwtStrategy)
