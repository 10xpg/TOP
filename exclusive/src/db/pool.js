require('dotenv').config()
const { Pool } = require('pg')

const dbString = process.env.PG_CONNECTION_STRING

const pool = new Pool({
  connectionString: dbString
})

module.exports = pool
