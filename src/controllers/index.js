const asyncHandler = require('express-async-handler')
const authMiddleware = require('../utils/passport')
const db = require('../db/queries')

const getEntry = asyncHandler((req, res) => {
  res.render('index')
})

const homepageGet = [
  authMiddleware.checkIsAuthenticated,
  asyncHandler(async (req, res) => {
    const directories = await db.folders.getAllDirectories()
    console.log(directories)
    res.render('home', { folders: directories })
  })
]

module.exports = {
  getEntry,
  homepageGet
}
