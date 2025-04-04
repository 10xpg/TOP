const db = require("../db/queries");

const allCategoriesGet = async (req, res, next) => {
  req.categories = await db.getCategoryList();
  // console.log("Categories: ", req.categories);
  next();
};

const allProductsGet = async (req, res) => {
  const products = await db.getAllProducts();
  res.render("index", { categories: req.categories, products });
};

module.exports = { allCategoriesGet, allProductsGet };
