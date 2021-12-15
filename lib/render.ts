import { liveBaseUrl } from "@/config/index";
import coreContract from "@/lib/coreContract";
import chromium from "chrome-aws-lambda";

async function getBrowserInstance(width: number, height: number) {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true,
      defaultViewport: {
        width: width,
        height: height,
      },
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
    defaultViewport: {
      width: width,
      height: height,
    },
  });
}

export async function getSVG(tokenId: string, width: string = "1920") {
  try {
    const browser = await getBrowserInstance(parseInt(width), parseInt(width));
    const page = await browser.newPage();
    const htmlResponse = await fetch(`${liveBaseUrl}${tokenId}`);
    await page.setContent(await htmlResponse.text());

    let data = await page.evaluate(
      () => document.querySelector("svg")!.outerHTML
    );
    data = data.replace(
      "<svg",
      '<svg xmlns="http://www.w3.org/2000/svg" version="1.1"'
    );
    return `<?xml version="1.0" encoding="UTF-8"?>\n` + data;
  } catch (err) {
    console.error(err);
    return "error generating preview";
  }
}

export async function getPNG(tokenId: string, width: string) {
  const projectId = await coreContract.methods
    .tokenIdToProjectId(tokenId)
    .call();
  const scriptInfo = await coreContract.methods
    .projectScriptInfo(projectId)
    .call();
  let aspectRatio = 1;
  try {
    const scriptJson = JSON.parse(scriptInfo.scriptJSON);
    aspectRatio = parseFloat(scriptJson.aspectRatio);
  } catch (e) {}
  const height = Math.round(parseInt(width) / aspectRatio);
  try {
    const browser = await getBrowserInstance(parseInt(width), height);
    const page = await browser.newPage();
    const htmlResponse = await fetch(`${liveBaseUrl}${tokenId}`);
    await page.setContent(await htmlResponse.text());
    const element = await page.$("svg");
    return await element.screenshot();
  } catch (err) {
    console.error(err);
    return "error generating preview";
  }
}
