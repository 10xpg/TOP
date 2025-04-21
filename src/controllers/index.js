const asyncHandler = require('express-async-handler')
const authMiddleware = require('../utils/passport')
const db = require('../db/queries')
const fts = require('../utils/filetree')

const getEntry = asyncHandler((req, res) => {
  res.render('index')
})

const homepageGet = [
  authMiddleware.checkIsAuthenticated,
  asyncHandler(async (req, res) => {
    const directories = await db.folders.getAllDirectories()
    let folders = fts.buildFileSystem(directories)
    res.render('home', { folders, directories })
  })
]

module.exports = {
  getEntry,
  homepageGet
}
