const { Router } = require('express')
const { fileUploadPost, fileDetailsGet } = require('../controllers/files')

const router = Router()

router.post('/upload', fileUploadPost)

router.get('/:filename/details', fileDetailsGet)

module.exports = router
