const db = require("../db/queries");

const addCategoryGet = (req, res) => {
  res.render("forms/category");
};
const addCategoryPost = async (req, res) => {
  const { category } = req.query;
  await db.createCategory(category);
  res.redirect("/");
};

const addProductGet = () => {};

module.exports = { addCategoryGet, addCategoryPost, addProductGet };
