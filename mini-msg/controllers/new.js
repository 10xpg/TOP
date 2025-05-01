const db = require("../db/queries");

const getForm = (req, res) => {
  res.render("form", { title: "Mini Messageboard" });
};

const getFormData = async (req, res) => {
  const { authorName, message } = req.body;
  await db.addMessage(message, authorName);
  res.redirect("/");
};

const getDetailPage = async (req, res) => {
  res.render("detail", {
    title: "Mini Messageboard Detail",
    id: req.params.detailId,
    messages: await db.getMessage(req.params.detailId),
  });
};

module.exports = { getForm, getFormData, getDetailPage };
