const http = require("http");
const fs = require("fs");
const path = require("path");

const server = http.createServer((req, res) => {
  // build the filePath
  let filePath = path.join(__dirname, req.url === "/" ? "index.html" : req.url);
  console.log(filePath);

  //read file
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if ((err.code = "ENOENT")) {
        fs.readFile(path.join(__dirname, "404.html"), (err, data) => {
          if (err) throw err;
          res.writeHead(404, { "content-type": "text/html" });
          res.end(data, "utf-8");
        });
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { "content-type": "text/html" });
      res.end(data, "utf-8");
    }
  });
});

const PORT = 8080;
server.listen(PORT, () => `Server is running on port: ${PORT}`);
