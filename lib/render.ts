import coreContract from "@/lib/coreContract";
import chromium from "chrome-aws-lambda";
import getScript from "@/lib/getScript";

async function getBrowserInstance() {
  const executablePath = await chromium.executablePath;

  if (!executablePath) {
    // running locally
    const puppeteer = require("puppeteer");
    return puppeteer.launch({
      args: chromium.args,
      headless: true,
      ignoreHTTPSErrors: true,
    });
  }

  return chromium.puppeteer.launch({
    args: chromium.args,
    executablePath,
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  });
}

function generateHtml(tokenId: any, hash: any, script: any) {
  return `
  <html>
    <head>
      <title>${tokenId}</title>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
      <script>
        let plot = true;
        let tokenData = {"hash":"${hash}"};
      </script>
      <script>
        ${script}
      </script>
      <style>
        * { margin: 0; padding: 0; }
      </style>
    </head>
    <body>
      <div id='app'></div>
    </body>
  </html>
    `;
}
export async function getSVG(tokenId: string) {
  const hash = await coreContract.methods.tokenIdToHash(tokenId).call();
  const projectId = await coreContract.methods
    .tokenIdToProjectId(tokenId)
    .call();
  let script = await getScript(projectId)

  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    const html = generateHtml(tokenId, hash, script);
    await page.setContent(html);

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

export async function getPNG(tokenId: string) {
  const hash = await coreContract.methods.tokenIdToHash(tokenId).call();
  const projectId = await coreContract.methods
    .tokenIdToProjectId(tokenId)
    .call();
  let script = await getScript(projectId)

  try {
    const browser = await getBrowserInstance();
    const page = await browser.newPage();
    const html = generateHtml(tokenId, hash, script);
    await page.setContent(html);

    const element = await page.$("svg");
    return await element.screenshot();
  } catch (err) {
    console.error(err);
    return "error generating preview";
  }
}
