const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const db = require('../db/queries')
const { verifyPassword } = require('./password')

const verifyCb = async (username, password, done) => {
  try {
    const user = await db.users.findUserByEmail(username)
    console.log(user)

    if (!user) {
      return done(null, false, { message: 'Invalid Email' })
    }

    //check if submitted pwd === hashedPwd
    const match = await verifyPassword(password, user.pwdHash)
    if (!match) {
      return done(null, false, { message: 'Invalid Password' })
    }

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
    const user = await db.users.findUserById(userId)
    done(null, user)
  } catch (err) {
    return done(err)
  }
})
