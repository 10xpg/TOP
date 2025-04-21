const db = require('../db/queries')

const createFolderGet = (req, res) => {
  res.render('createDirectory')
}

const createFolderPost = async (req, res) => {
  const { folder } = req.body
  const { id } = req.user
  const root = await db.folders.getSingleDirectory(id, 'root')
  await db.folders.createDirectory(id, folder, root.id)
  res.redirect('/home')
}

const editFolderGet = async (req, res) => {
  const { dirname } = req.params
  const { id } = req.user
  const directory = await db.folders.getSingleDirectory(id, dirname)
  res.render('renameDirectory', { folder: directory })
}

const editFolderPost = async (req, res) => {
  const { id } = req.user
  const { oldname, folder } = req.body

  await db.folders.updateSingleDirectory(id, oldname, folder)
  res.redirect('/home')
}

const deleteFolderGet = async (req, res) => {
  const { id } = req.user
  const { dirname } = req.params
  await db.folders.deleteSingleDirectory(id, dirname)
  res.redirect('/home')
}

const openFolderGet = async (req, res) => {
  const { id } = req.user
  const { dirname } = req.params
  const folder = await db.folders.getSingleDirectory(id, dirname)
  res.render('directory', { dirname, folder })
}

module.exports = {
  createFolderGet,
  createFolderPost,
  editFolderGet,
  editFolderPost,
  deleteFolderGet,
  openFolderGet
}
