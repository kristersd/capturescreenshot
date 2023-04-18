import express from 'express';
import { type Request } from "express";
import cors from "cors";
import { DEFAULT_URL, screenshotPath, takeScreenshot } from './screenshot';
import { sha256 } from './utils/hash';
import fs from "fs";

const app = express();
app.use(cors());

const PORT = 8080;

type ReqParams = {
  url?: string;
}

app.use(express.static("public"));

app.get("/", (req: Request<{}, {}, {}, ReqParams>, res) => {
  const url = req.query.url ?? DEFAULT_URL;
  const hashedUrl = sha256(url);
  const path = screenshotPath(hashedUrl);
  const fileExists = fs.existsSync(path);
  if (!fileExists) {
    res.status(202);
    takeScreenshot({ url, fileName: hashedUrl })
  }
  res.send({
    url: hashedUrl,
  });
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
