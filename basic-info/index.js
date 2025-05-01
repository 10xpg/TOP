const path = require("path");
const fs = require("fs");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.join(__dirname, "about.html"));
});

app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "contact-me.html"));
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "404.html"));
});

// const server = http.createServer((req, res) => {
//   // build the filePath
//   let filePath = "";

//   if (req.url === "/") {
//     filePath = path.join(__dirname, "index.html");
//   }
//   if (req.url === "/about") {
//     filePath = path.join(__dirname, "about.html");
//   }
//   if (req.url === "/contact-me") {
//     filePath = path.join(__dirname, "contact-me.html");
//   }

//   console.log(filePath);
//   console.log(req.url);

//   //read file
//   fs.readFile(filePath, (err, data) => {
//     if (err) {
//       if ((err.code = "ENOENT")) {
//         fs.readFile(path.join(__dirname, "404.html"), (err, data) => {
//           if (err) throw err;
//           res.writeHead(404, { "content-type": "text/html" });
//           res.end(data, "utf-8");
//         });
//       } else {
//         res.writeHead(500);
//         res.end(`Server Error: ${err.code}`);
//       }
//     } else {
//       res.writeHead(200, { "content-type": "text/html" });
//       res.end(data, "utf-8");
//     }
//   });
// });

const PORT = 8080;
app.listen(PORT, () => `Server is running on port: ${PORT}`);
