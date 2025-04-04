const db = require("../db/queries");
const { query, validationResult } = require("express-validator");

// -> Middlerwares
const allCategoriesGet = async (req, res, next) => {
  req.categories = await db.getCategoryList();
  // console.log("Categories: ", req.categories);
  next();
};

// -> Validators
const validateCategoryInput = [
  query("category")
    .toLowerCase()
    .notEmpty()
    .withMessage("Field cannot be left empty"),
];

// -> Routes
const addCategoryGet = [
  validateCategoryInput,
  async (req, res) => {
    if (!req.query.category) {
      return res.render("forms/category");
    }
    const { category } = req.query;
    await db.createCategory(category);
    console.log("Added to category: ", category);
    res.redirect("/");
  },
];

const addProductGet = [
  async (req, res) => {
    res.render("forms/product", { categories: req.categories });
  },
];

module.exports = { allCategoriesGet, addCategoryGet, addProductGet };
