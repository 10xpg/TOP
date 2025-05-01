const { Router } = require("express");
const { authorizeActionPost } = require("../controllers/auth");

const router = Router();

router.post("/", authorizeActionPost);

module.exports = router;
