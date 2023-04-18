import puppeteer, {type PuppeteerLaunchOptions, type Browser} from "puppeteer";

let instance: Promise<Browser>;

export const getBrowserInstance = async (options?: PuppeteerLaunchOptions): Promise<Browser> => {
  return (instance ??= puppeteer.launch(options));
}
