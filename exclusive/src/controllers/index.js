const db = require('../db/queries')

const getEntry = async (req, res) => {
  const user = req.user
  const messages = await db.getAllMessages()
  res.render('index', { user, messages })
}

module.exports = { getEntry }
