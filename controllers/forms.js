const db = require("../db/queries");
const { query, validationResult } = require("express-validator");
const asyncHandler = require("express-async-handler");

// -> Middlewares
const allCategoriesGet = async (req, res, next) => {
  req.categories = await db.getCategoryList();
  // console.log("Categories: ", req.categories);
  // console.log("Params: ", req.query);
  next();
};

// -> Validators
const validateCategoryInput = [
  (req, res, next) => {
    if (!req.query.category) return next(); // skip if no input
    next();
  },
  query("category")
    .toLowerCase()
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isLength({ min: 1, max: 255 })
    .withMessage('Character Length : min -> "1", max -> "255"'),
];

const validateProductInput = [
  (req, res, next) => {
    if (!req.query.category) return next(); // skip if no input
    next();
  },
  query("category")
    .toLowerCase()
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isLength({ min: 1, max: 255 })
    .withMessage('Character Length : min -> "1", max -> "255"'),
  query("product")
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isLength({ min: 1, max: 255 })
    .withMessage('Character Length : min -> "1", max -> "255"'),
  query("description")
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isLength({ min: 1, max: 500 })
    .withMessage('Character Length : min -> "1", max -> "500"'),
  ,
  query("price")
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isLength({ min: 1, max: 4 })
    .withMessage('Character Length : min -> "1", max -> "4"')
    .isNumeric()
    .withMessage("Value must be a number"),
  ,
  query("image").notEmpty().withMessage("Field cannot be left empty"),
  query("quantity")
    .notEmpty()
    .withMessage("Field cannot be left empty")
    .isNumeric()
    .withMessage("Value must be a number"),
];

// -> Routes
const addCategoryGet = [
  validateCategoryInput,
  asyncHandler(async (req, res) => {
    if (!req.query.category) {
      return res.render("forms/addCategory");
    }
    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/addCategory", {
        errors: errors.array(),
      });
    }
    const { category } = req.query;
    await db.createCategory(category);
    console.log("Added to category: ", category);
    res.redirect("/");
  }),
];

const addProductGet = [
  validateProductInput,
  asyncHandler(async (req, res) => {
    if (!req.query.category) {
      return res.render("forms/addProduct", { categories: req.categories });
    }
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/addProduct", {
        errors: errors.array(),
      });
    }
    const { category, product, description, price, image, quantity } =
      req.query;
    await db.addProductToCategory(
      category,
      product,
      description,
      price,
      image,
      quantity
    );
    res.redirect("/");
  }),
];

const updateCategoryGet = [
  validateCategoryInput,
  asyncHandler(async (req, res) => {
    console.log("param: ", req.params.id);
    const selectedCategory = await db.getCategory(req.params.id);
    const categoryId = selectedCategory[0].id;

    if (!req.query.category) {
      return res.render("forms/updateCategory", {
        category: selectedCategory[0].category,
      });
    }

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/updateCategory", {
        errors: errors.array(),
      });
    }

    const { category } = req.query; // the new value

    await db.editCategory(category, categoryId);
    console.log("Update to category: ", category);
    res.redirect("/");
  }),
];

const updateProductGet = [
  validateCategoryInput,
  asyncHandler(async (req, res) => {
    console.log("param: ", req.params.id);
    const selectedProduct = await db.getProduct(req.params.id);
    console.log("selectedProduct: ", selectedProduct);
    const productId = selectedProduct[0].id;

    if (!req.query.category) {
      return res.render("forms/updateProduct", {
        categories: req.categories,
        selectedProduct,
      });
    }

    const errors = validationResult(req);
    console.log(errors);
    if (!errors.isEmpty()) {
      return res.status(400).render("forms/updateProduct", {
        errors: errors.array(),
      });
    }

    const { category, product, description, price, image, quantity } =
      req.query;

    await db.editProduct(
      productId,
      category,
      product,
      description,
      price,
      image,
      quantity
    );
    console.log("Update to category: ", category);
    res.redirect("/");
  }),
];

module.exports = {
  allCategoriesGet,
  addCategoryGet,
  addProductGet,
  updateCategoryGet,
  updateProductGet,
};
