const { Router } = require("express");
const { getForm, getFormData } = require("../controllers/new");
const router = Router();

router.get("/", getForm);

router.post("/", getFormData);

module.exports = router;
