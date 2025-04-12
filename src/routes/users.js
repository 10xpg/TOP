const { Router } = require('express')
const { createUserGet, createUserPost, authenticateUserGet, authenticateUserPost, logoutUser } = require('../controllers/users')

const router = Router()

// -> GET routes
router.get('/register', createUserGet)

router.get('/login', authenticateUserGet)

router.get('/logout', logoutUser)

// -> POST routes
router.post('/register', createUserPost)

router.post('/login', authenticateUserPost)

module.exports = router
