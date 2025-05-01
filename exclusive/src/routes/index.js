const { Router } = require('express')
const { getEntry } = require('../controllers/index')

const router = Router()

router.get('/', getEntry)

module.exports = router
