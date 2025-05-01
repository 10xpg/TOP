const asyncHandler = require('express-async-handler')
const multer = require('multer')
const db = require('../db/queries')
const path = require('path')
const { filesize } = require('filesize')
const uploadToCloudStorage = require('../utils/cloudinary')
const axios = require('axios')

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// !: THIS FEATURE SUPPORTS IMAGES AND PDF
const fileUploadPost = [
  upload.array('uploadedfile'),
  asyncHandler((req, res, next) => {
    const files = req.files
    const userId = req.user.id
    const { dirname } = req.body
    console.log(files)
    files.forEach(async (f) => {
      const ext = path.extname(f.originalname)
      let type = 'image'
      if (ext !== '.jpeg' || '.jpg' || '.png' || '.gif' || '.svg' || '.webp') type = 'raw'
      const uploadResult = await uploadToCloudStorage(f.buffer, type)
      const { secure_url } = uploadResult
      await db.files.uploadFile(userId, secure_url, ext, f.size, f.originalname, f.mimetype, dirname)
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
  try {
    const { filename } = req.params
    const { name, mimetype, originalname } = await db.files.getSingleFile(filename)
    // // const filepath = path.resolve('uploads', name)
    // download file from cloudinary
    // where fileUrl === name
    const response = await axios.get(name, { responseType: 'stream' })
    res.setHeader('Content-Disposition', `attachment; filename="${originalname}"`)
    res.setHeader('Content-Type', mimetype)
    response.data.pipe(res)
  } catch (err) {
    console.error('Download error:', err)
    res.status(500).send('Could not download file.')
  }
}

module.exports = { fileUploadPost, fileDetailsGet, fileDownloadGet }
