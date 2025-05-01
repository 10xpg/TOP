const { Router } = require('express')
const { createFolderGet, createFolderPost, editFolderGet, editFolderPost, deleteFolderGet, openFolderGet } = require('../controllers/dirs')

const router = Router()

router.get('/create', createFolderGet)
router.post('/create', createFolderPost)
router.get('/:dirname/open', openFolderGet)
router.get('/:dirname/rename', editFolderGet)
router.post('/rename', editFolderPost)
router.get('/:dirname/delete', deleteFolderGet)

module.exports = router
