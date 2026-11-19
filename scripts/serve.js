const http = require("http");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..", "public");
const port = Number(process.env.PORT) || 4173;

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".txt": "text/plain; charset=utf-8",
  ".ico": "image/x-icon",
};

function resolvePath(urlPath) {
  let pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname.startsWith("/play/") && pathname !== "/play.html") pathname = "/play.html";
  if (pathname.endsWith("/")) pathname += "index.html";
  const filePath = path.normalize(path.join(root, pathname));
  if (filePath !== root && !filePath.startsWith(root + path.sep)) return null;
  return filePath;
}

const server = http.createServer((req, res) => {
  const filePath = resolvePath(req.url || "/");
  if (!filePath) {
    res.writeHead(403);
    res.end("Forbidden");
    return;
  }

  fs.readFile(filePath, (error, data) => {
    if (error) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not found");
      return;
    }
    const type = types[path.extname(filePath)] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": type, "Cache-Control": "no-cache" });
    res.end(data);
  });
});

server.listen(port, () => {
  console.log(`Roch Games at http://localhost:${port}`);
});
