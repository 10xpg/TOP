const { Router } = require('express')
const { fileUploadPost } = require('../controllers/files')

const router = Router()

router.post('/upload', fileUploadPost)

module.exports = router
