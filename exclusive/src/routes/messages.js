const { Router } = require('express')
const {
  createMessageGet,
  getMessagesGet,
  createMessagePost,
  updateMessageGet,
  updateMessagePost,
  deleteMessageGet
} = require('../controllers/messages')

const router = Router()

router.get('/', getMessagesGet)

router.get('/create', createMessageGet)

router.get('/update/:msgId', updateMessageGet)

router.get('/delete/:msgId', deleteMessageGet)

router.post('/create', createMessagePost)

router.post('/update/:msgId', updateMessagePost)

module.exports = router
