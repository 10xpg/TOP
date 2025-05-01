const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const allCategoriesGet = asyncHandler(async (req, res, next) => {
  req.categories = await db.getCategoryList();
  // console.log("Categories: ", req.categories);
  next();
});

const allProductsGet = asyncHandler(async (req, res) => {
  const products = await db.getAllProducts();
  if (req.url === "/") {
    res.render("index", { categories: req.categories, products });
  }
});

const categoryGet = asyncHandler(async (req, res) => {
  const categoryParam = req.params.category;
  const category = await db.getAllCategory(categoryParam);
  // console.log("Selected category: ", category);
  if (req.url != "/") {
    res.render("index", { categories: req.categories, products: category });
  }
});

module.exports = { allCategoriesGet, allProductsGet, categoryGet };
