const express = require("express");
const path = require("path");
const rootRoute = require("./routes/index");
const newMessageRoute = require("./routes/new");

const app = express();
const port = 3000;

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use("/", rootRoute);
app.use("/new", newMessageRoute);

app.listen(port, () => `Server running on port ${port} `);
