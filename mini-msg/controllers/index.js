const db = require("../db/queries");

const getMessages = async (req, res) => {
  res.render("index", {
    title: "Mini Messageboard",
    messages: await db.getAllMessages(),
  });
};

module.exports = { getMessages };
