require('dotenv').config()
const bcrypt = require('bcryptjs')
const db = require('../db/query')
const jwt = require('jsonwebtoken')
const passport = require('passport')

const SECRET = process.env.JWT_SECRET

const createUser = async (req, res) => {
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const { firstname, lastname, email, password } = req.body
  const salt = await bcrypt.genSalt(10)
  const hashedPwd = await bcrypt.hash(password, salt)
  const newUser = await db.users.createUser(email, hashedPwd, firstname, lastname)
  res.json({ message: 'User created ', ...newUser })
}

const getAllUsers = async (req, res) => {
  const allUsers = await db.users.getAllUsers()
  if (!allUsers) return res.status(404).json({ status: 'error', message: 'No users found' })
  res.json([...allUsers])
}

const getUser = async (req, res) => {
  const { id } = req.params
  const user = await db.users.getUserById(Number(id))
  if (!user) return res.status(404).json({ status: 'error', message: `User with id: '${id}' does not exist` })
  console.log(user)
  res.json(user)
}

const updateUser = async (req, res) => {
  const { id } = req.params
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const { email, firstname, lastname } = req.body
  const userDetailsOld = await db.users.getUserById(Number(id))
  const { email: oldEmail, firstname: oldFirstName, lastname: oldLastName } = userDetailsOld
  const userDetailsNew = await db.users.updateUserInfo(Number(id), email || oldEmail, firstname || oldFirstName, lastname || oldLastName)
  if (!userDetailsNew) return res.status(400).json({ status: 'error', message: 'Update failed' })
  res.json({ message: 'Update successful ', ...userDetailsNew })
}

const deleteUser = async (req, res) => {
  const { id } = req.params
  if (!req.params) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const user = await db.users.deleteUser(Number(id))
  if (!user) return res.status(404).json({ status: 'error', message: `User with id: '${id}' does not exist` })
  res.json({ ...user })
}

const changeUserRole = async (req, res) => {
  const { id } = req.params
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const { email } = req.body
  const user = await db.users.updateUserRole(Number(id), email)
  if (!user) return res.status(400).json({ status: 'error', message: 'Operation failed' })
  res.json({ message: 'Operation successful ', ...user })
}

const login = async (req, res, next) => {
  passport.authenticate('login', async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error('An error occured.')
        return next(error)
      }
      req.login(user, { session: false }, async (err) => {
        if (err) return next(err)

        const payload = { sub: user.id, name: `${user.firstname} ${user.lastname}`, email: user.email, role: user.role }
        jwt.sign(payload, SECRET, (err, token) => {
          if (err) return res.status(500).json({ status: 'error', message: 'Failed to sign JWT' })
          res.json({ message: 'Authentication Successful', token })
        })
      })
    } catch (err) {}
  })(req, res, next)
}

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  changeUserRole,
  login
}
