const { messages } = require("./index");

const getForm = (req, res) => {
  res.render("form", { title: "Mini Messageboard" });
};

const getFormData = (req, res) => {
  const { authorName, message } = req.body;
  messages.push({ text: message, user: authorName, added: new Date() });
  res.redirect("/");
};

module.exports = { getForm, getFormData };
