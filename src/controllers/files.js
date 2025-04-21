const asyncHandler = require('express-async-handler')
const multer = require('multer')
const db = require('../db/queries')
const path = require('path')

const upload = multer({ dest: 'uploads/' })

const fileUploadPost = [
  upload.array('uploadedfile'),
  asyncHandler((req, res, next) => {
    const files = req.files
    const userId = req.user.id
    const { dirname } = req.body
    console.log(files)
    files.forEach(async (f) => {
      await db.files.uploadFile(userId, f.filename, path.extname(f.originalname), f.size, f.originalname, f.mimetype, dirname)
    })

    res.redirect('/home')
  })
]

module.exports = { fileUploadPost }
