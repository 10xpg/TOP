const { Router } = require("express");
const {
  addCategoryGet,
  addProductGet,
  allCategoriesGet,
  updateCategoryGet,
  updateProductGet,
  deleteCategoryGet,
  deleteProductGet,
} = require("../controllers/forms");

const router = Router();

// -> Categories
router.get("/category", addCategoryGet);
router.get("/category/:id/update", updateCategoryGet);
router.get("/category/:id/delete", deleteCategoryGet);

// -> Products
router.get("/product", [allCategoriesGet, addProductGet]);
router.get("/product/:id/update", [allCategoriesGet, updateProductGet]);
router.get("/product/:id/delete", [allCategoriesGet, deleteProductGet]);

module.exports = router;
