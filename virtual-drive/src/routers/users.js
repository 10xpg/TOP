const { Router } = require('express')
const { authenticateUserPost, authenticateUserGet, registerUserGet, registerUserPost, unauthUserGet } = require('../controllers/users')

const router = Router()

router.get('/register', registerUserGet)
router.get('/login', authenticateUserGet)
router.get('/logout', unauthUserGet)

router.post('/register', registerUserPost)
router.post('/login', authenticateUserPost)

module.exports = router
