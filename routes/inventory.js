const { Router } = require("express");
const {
  allCategoriesGet,
  allProductsGet,
} = require("../controllers/inventory");

const router = Router();

router.get("/", [allCategoriesGet, allProductsGet]);

module.exports = router;
