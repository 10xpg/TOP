const session = require('express-session')
const PgSimpleSessionStore = require('connect-pg-simple')(session)
const pool = require('./pool')

const pgStore = new PgSimpleSessionStore({
  pool: pool,
  createTableIfMissing: true
})

module.exports = pgStore
