require('dotenv').config()
const cloudinary = require('cloudinary').v2
const streamifier = require('streamifier')

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

async function uploadToCloudStorage(buffer, type) {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream({ folder: 'test', resource_type: `${type}` }, (error, result) => {
      if (error) return reject(error)
      resolve(result)
    })

    streamifier.createReadStream(buffer).pipe(stream)
  })
}

module.exports = uploadToCloudStorage
