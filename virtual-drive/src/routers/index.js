const { Router } = require('express')
const { getEntry, homepageGet } = require('../controllers/index')

const router = Router()

router.get('/', getEntry)
router.get('/home', homepageGet)

module.exports = router
