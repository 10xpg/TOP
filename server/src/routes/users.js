const { Router } = require('express')
const { createUser, getAllUsers, getUser, updateUser, deleteUser, changeUserRole } = require('../controllers/users')

const router = Router()

router.post('/', createUser)
router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/role', changeUserRole)

module.exports = router
