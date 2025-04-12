const pool = require('./pool')

const createUser = async (username, firstname, lastname, password, salt) => {
  await pool.query(
    `
        INSERT INTO users (username,firstname, lastname, pwdhash, salt) VALUES
        ($1,$2,$3,$4,$5)
    `,
    [username, firstname, lastname, password, salt]
  )
}

const findUserByUsername = async (username) => {
  const { rows } = await pool.query(
    `
        SELECT * FROM users WHERE username = $1
    `,
    [username]
  )
  const user = rows[0]
  return user
}

const findUserByUserId = async (userId) => {
  const { rows } = await pool.query(
    `
        SELECT * FROM users WHERE id = $1
    `,
    [userId]
  )
  const user = rows[0]
  return user
}

module.exports = { createUser, findUserByUsername, findUserByUserId }
