const { Router } = require("express");
const {
  allCategoriesGet,
  allProductsGet,
  categoryGet,
} = require("../controllers/inventory");

const router = Router();

router.get("/", [allCategoriesGet, allProductsGet]);
router.get("/:category", [allCategoriesGet, categoryGet]);

module.exports = router;
