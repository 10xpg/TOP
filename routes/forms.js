const { Router } = require("express");
const { addCategoryGet, addProductGet } = require("../controllers/forms");

const router = Router();

router.get("/category", addCategoryGet);
router.get("/product", addProductGet);

module.exports = router;
