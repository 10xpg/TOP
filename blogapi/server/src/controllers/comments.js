const db = require('../db/query')

const createComment = async (req, res) => {
  const { id: commenterId, body } = req.body
  const { id: postId } = req.params
  if (!postId && commenterId && body) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const comment = await db.comments.createComment(Number(postId), commenterId, body)
  res.json({ message: 'Comment created', ...comment })
}

const getAllComments = async (req, res) => {
  const { id: postId } = req.params
  if (!postId) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const comments = await db.comments.getAllCommentsLinkedToPost(Number(postId))
  if (!comments || comments.length < 1) return res.status(404).json({ status: 'error', message: 'No comments found' })
  res.json([...comments])
}

const getComment = async (req, res) => {
  const { id: postId, commentId } = req.params
  if (!postId && !commentId) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const comment = await db.comments.getCommentLinkedToPost(Number(postId), Number(commentId))
  if (!comment) return res.status(404).json({ status: 'error', message: 'No comment found' })
  res.json(comment)
}

const updateComment = async (req, res) => {
  const { comment } = req.body
  const { id: postId, commentId } = req.params
  if (!postId || !commentId) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const oldComment = await db.comments.getCommentLinkedToPost(Number(postId), Number(commentId))
  const { comment: commentOld } = oldComment
  const updatedComment = await db.comments.editComment(Number(postId), Number(commentId), comment || commentOld)
  if (!updatedComment) return res.status(400).json({ status: 'error', message: 'Update failed' })
  res.json({ message: 'Update successful', ...updatedComment })
}

const deleteComment = async (req, res) => {
  const { id: postId, commentId } = req.params
  if (!postId || !commentId) return res.status(400).json({ status: 'error', message: 'Bad Request' })
  const comment = await db.comments.deleteComment(Number(postId), Number(commentId))
  if (!comment) return res.status(404).json({ status: 'error', message: `Comment with id: '${commentId}' does not exist` })
  res.json(comment)
}

module.exports = {
  createComment,
  getAllComments,
  getComment,
  updateComment,
  deleteComment
}
