const { Router } = require('express')
const { createFolderGet, createFolderPost, editFolderGet, editFolderPost, deleteFolderGet } = require('../controllers/dirs')

const router = Router()

router.get('/create', createFolderGet)
router.post('/create', createFolderPost)
router.get('/rename/:dirname', editFolderGet)
router.post('/rename', editFolderPost)
router.get('/delete/:dirname', deleteFolderGet)

module.exports = router
