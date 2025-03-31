const { messages } = require("./index");

const getForm = (req, res) => {
  res.render("form", { title: "Mini Messageboard" });
};

const getFormData = (req, res) => {
  const { authorName, message } = req.body;
  messages.push({ text: message, user: authorName, added: new Date() });
  res.redirect("/");
};

const getDetailPage = (req, res) => {
  res.render("detail", {
    title: "Mini Messageboard Detail",
    id: req.params.detailId,
    messages,
  });
};
module.exports = { getForm, getFormData, getDetailPage };
