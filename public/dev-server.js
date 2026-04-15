const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 8080;
const DIR = __dirname;

const MIME = {
  ".html": "text/html",
  ".js":   "application/javascript",
  ".css":  "text/css",
  ".json": "application/json",
  ".png":  "image/png",
  ".jpg":  "image/jpeg",
  ".svg":  "image/svg+xml",
};

http.createServer((req, res) => {
  const url = req.url.split("?")[0];
  const file = path.join(DIR, url === "/" ? "areamap-preview.html" : url);

  fs.readFile(file, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("Not found");
      return;
    }
    const ext = path.extname(file);
    res.writeHead(200, {
      "Content-Type": MIME[ext] || "application/octet-stream",
      "Cache-Control": "no-store, no-cache, must-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    });
    res.end(data);
  });
}).listen(PORT, () => {
  console.log(`Dev server (no-cache) running at http://localhost:${PORT}`);
});
