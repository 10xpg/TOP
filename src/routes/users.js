const { Router } = require('express')
const {
  createUserGet,
  createUserPost,
  authenticateUserGet,
  authenticateUserPost,
  logoutUser,
  upgradeStatus,
  promoteToMember,
  promoteToAdmin
} = require('../controllers/users')

const router = Router()

// -> GET routes
router.get('/register', createUserGet)

router.get('/login', authenticateUserGet)

router.get('/logout', logoutUser)

router.get('/backroom', upgradeStatus)

// -> POST routes
router.post('/register', createUserPost)

router.post('/login', authenticateUserPost)

router.post('/member', promoteToMember)

router.post('/admin', promoteToAdmin)

module.exports = router
