const { Router } = require("express");
const { getForm, getFormData, getDetailPage } = require("../controllers/new");
const router = Router();

router.get("/", getForm);
router.get("/:detailId", getDetailPage);
router.post("/", getFormData);

module.exports = router;
