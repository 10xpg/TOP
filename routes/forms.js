const { Router } = require("express");
const {
  addCategoryGet,
  addProductGet,
  allCategoriesGet,
} = require("../controllers/forms");

const router = Router();

router.get("/category", addCategoryGet);
router.get("/product", [allCategoriesGet, addProductGet]);

module.exports = router;
