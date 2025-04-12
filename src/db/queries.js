const pool = require('./pool')

const getMemberSecret = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM promotions WHERE status = 'member'
  `)
  const secret = rows[0]
  return secret
}

const getAdminSecret = async () => {
  const { rows } = await pool.query(`
    SELECT * FROM promotions WHERE status = 'admin'
  `)
  const secret = rows[0]
  return secret
}

const upgradeToMember = async (bool, username) => {
  await pool.query(
    `
    UPDATE users SET ismember = $1, updatedat = CURRENT_TIMESTAMP WHERE username = $2
  `,
    [bool, username]
  )
}

const upgradeToAdmin = async (bool, username) => {
  await pool.query(
    `
    UPDATE users SET isadmin = $1, updatedat = CURRENT_TIMESTAMP WHERE username = $2
  `,
    [bool, username]
  )
}

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

module.exports = { createUser, findUserByUsername, findUserByUserId, getAdminSecret, getMemberSecret, upgradeToMember, upgradeToAdmin }
