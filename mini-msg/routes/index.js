const { Router } = require("express");
const { getMessages } = require("../controllers/index");
const router = Router();

router.get("/", getMessages);

module.exports = router;
