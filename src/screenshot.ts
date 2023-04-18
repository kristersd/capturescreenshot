import { getBrowserInstance } from "./browser";
import path from "path";

const sleep = () => new Promise((r) => setTimeout(r, 1500));

export const DEFAULT_URL = "https://app.singular.live/output/6W76ei5ZNekKkYhe8nw5o8/Output?aspect=16:9";

type TakeScreenshot = {
  width?: number;
  height?: number;
  url: string;
  fileName: string;
}

export const takeScreenshot = async ({ width = 1280, height = 720, url, fileName }: TakeScreenshot) => {
  const browser = await getBrowserInstance();
  const page = await browser.newPage();
  await page.setViewport({ width, height });
  await page.goto(url, { waitUntil: "networkidle0" });
  await sleep();
  const fsPath = screenshotPath(fileName);
  await page.screenshot({
    path: fsPath,
    omitBackground: true,
  })
  await page.close();
};

export const screenshotPath = (fileName: string) => path.join(__dirname, `../public/uploads/${fileName}.png`);
