const db = require('../db/query')

const getAllPosts = async (req, res) => {
  const allPosts = await db.posts.getAllPosts()
  if (!allPosts) return res.status(404).json({ status: 'error', message: 'No posts found' })
  res.json([...allPosts])
}

const createPost = async (req, res) => {
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const { id, title, body } = req.body
  const post = await db.posts.createPost(id, title, body)
  res.json({ message: 'Post created', ...post })
}

const getPost = async (req, res) => {
  const { id } = req.params
  const post = await db.posts.getSinglePost(Number(id))
  if (!post) return res.status(404).json({ status: 'error', message: 'No post found' })
  res.json(post)
}

const getPostsByUser = async (req, res) => {
  const { authorId } = req.query
  if (!authorId) res.status(400).json({ status: 'error', message: 'Bad Request' })
  const post = await db.posts.getPostsBySingleUser(Number(authorId))
  if (!post) return res.status(404).json({ status: 'error', message: 'No post found' })
  res.json(post)
}

const updatePost = async (req, res) => {
  const { id } = req.params
  if (!req.params) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  if (!req.body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const { title, body } = req.body
  const post = await db.posts.getSinglePost(Number(id))
  const { title: oldTitle, content } = post
  const updatedPost = await db.posts.editPostContent(Number(id), title || oldTitle, body || content)
  if (!updatedPost) return res.status(400).json({ status: 'error', message: 'Update failed' })
  res.json({ message: 'Update successful ', ...updatedPost })
}

const publishPost = async (req, res) => {
  const { id } = req.params
  if (!req.params) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const post = await db.posts.publishPost(Number(id))
  if (!post) return res.status(400).json({ status: 'error', message: 'Operation failed' })
  res.json({ message: 'Operation successful ', ...post })
}

const deletePost = async (req, res) => {
  const { id } = req.params
  if (!req.params) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const post = await db.posts.deleteSinglePost(Number(id))
  if (!post) return res.status(404).json({ status: 'error', message: `Post with id: '${id}' does not exist` })
  res.json({ ...post })
}

module.exports = {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
  getPostsByUser,
  publishPost
}
