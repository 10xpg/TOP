const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const authorizeActionPost = asyncHandler(async (req, res) => {
  const { username, password, endpoint } = req.body;
  const authCheck = await db.grantAccess(username, password);

  if (authCheck.length === 0) {
    res.status(401).render("partials/unauthorized");
  } else if (
    username === authCheck[0].username &&
    password === authCheck[0].password
  ) {
    res.redirect(`/${endpoint}`);
  }
});

module.exports = { authorizeActionPost };
