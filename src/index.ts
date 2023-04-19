import express from 'express';
import { type Request } from "express";
import cors from "cors";
import { DEFAULT_URL, screenshotPath, takeScreenshot } from './screenshot';
import { sha256 } from './utils/hash';
import fs from "fs";
import { generateMediaStoreUrl, validateUrl } from './utils/url';

const app = express();
app.use(cors({
  origin: "https://127.0.0.1:8445",
  allowedHeaders: "Location",
  exposedHeaders: "Location",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
}));

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
    if (!validateUrl(url)) {
      res.status(403).send();
      return;
    }
    takeScreenshot({ url, fileName: hashedUrl });
    res.status(202).send();
    return;
  }
  res.setHeader("Location", generateMediaStoreUrl(hashedUrl));
  res.status(200).send();
});

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});
