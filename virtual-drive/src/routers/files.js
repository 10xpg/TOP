const { Router } = require('express')
const { fileUploadPost, fileDetailsGet, fileDownloadGet } = require('../controllers/files')

const router = Router()

router.post('/upload', fileUploadPost)
router.get('/:filename/download', fileDownloadGet)
router.get('/:filename/details', fileDetailsGet)

module.exports = router
