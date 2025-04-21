const asyncHandler = require('express-async-handler')
const multer = require('multer')
const db = require('../db/queries')
const path = require('path')
const { filesize } = require('filesize')

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

const fileDetailsGet = async (req, res) => {
  const { filename } = req.params
  const file = await db.files.getSingleFile(filename)
  file.size = filesize(file.size)

  res.render('fileDetails', { details: file })
}

const fileDownloadGet = async (req, res) => {
  const { filename } = req.params
  const { name } = await db.files.getSingleFile(filename)

  const filepath = path.resolve('uploads', name)

  res.download(filepath, (err) => {
    if (err) {
      console.error('Download error:', err)
      res.status(500).send('Could not download file.')
    }
  })
}

module.exports = { fileUploadPost, fileDetailsGet, fileDownloadGet }
