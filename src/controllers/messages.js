const db = require('../db/queries')
const validator = require('../utils/validators')
const asyncHandler = require('express-async-handler')
const { validationResult } = require('express-validator')

const getMessagesGet = asyncHandler(async (req, res) => {
  const messages = await db.getAllMessages()
  console.log(messages)
  res.render('home', { messages: messages })
})

const createMessageGet = asyncHandler((req, res) => {
  res.render('newmessage')
})

const createMessagePost = [
  validator.validateMessage,
  asyncHandler(async (req, res) => {
    const { id } = req.user
    const { title, message } = req.body

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('newmessage', { errors: errors.array() })
    }

    await db.createMessage(id, title, message)
    res.redirect('/message')
  })
]

const updateMessageGet = asyncHandler(async (req, res) => {
  const { msgId } = req.params

  const messageToUpdate = { id: null, title: null, message: null }
  const message = await db.findMessageById(msgId)
  res.render('updatemessage', { message: message, messageToUpdate: messageToUpdate })
})

const updateMessagePost = [
  validator.validateMessage,
  asyncHandler(async (req, res) => {
    const { id } = req.user
    const { msgId } = req.params
    const { title, message } = req.body
    const messageToUpdate = await db.findMessageById(msgId)

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).render('updatemessage', { messageToUpdate: messageToUpdate, errors: errors.array() })
    }

    await db.updateMessage(msgId, title, message, id)
    res.redirect('/message')
  })
]

const deleteMessageGet = asyncHandler(async (req, res) => {
  const { msgId } = req.params
  await db.deleteMessage(msgId)
  res.redirect('/message')
})

module.exports = { getMessagesGet, createMessageGet, createMessagePost, updateMessageGet, updateMessagePost, deleteMessageGet }
