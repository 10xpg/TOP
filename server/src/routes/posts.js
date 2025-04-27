const { Router } = require('express')
const { createPost, getPost, getAllPosts, updatePost, deletePost, getPostsByUser, publishPost } = require('../controllers/posts')
const { createComment, getAllComments, getComment, updateComment, deleteComment } = require('../controllers/comments')

const router = Router()

router.get('/', getPostsByUser)

router.post('/', createPost)

router.get('/', getAllPosts)

router.get('/:id', getPost)

router.put('/:id', updatePost)

router.put('/:id/public', publishPost)

router.delete('/:id', deletePost)

router.post('/:id/comments', createComment)

router.get('/:id/comments', getAllComments)

router.get('/:id/comments/:id', getComment)

router.put('/:id/comments/:id', updateComment)

router.delete('/:id/comments/:id', deleteComment)

module.exports = router
