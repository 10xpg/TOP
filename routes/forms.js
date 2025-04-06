const { Router } = require("express");
const {
  addCategoryGet,
  addProductGet,
  allCategoriesGet,
  updateCategoryGet,
  updateProductGet,
} = require("../controllers/forms");

const router = Router();

// -> Categories
router.get("/category", addCategoryGet);
router.get("/category/:id/update", updateCategoryGet);

// -> Products
router.get("/product", [allCategoriesGet, addProductGet]);
router.get("/product/:id/update", [allCategoriesGet, updateProductGet]);

module.exports = router;
