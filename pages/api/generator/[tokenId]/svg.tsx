import coreAbi from "@/config/coreAbi.json";
import { coreContractAddress } from "@/config/index";
import { CoreAbi } from "@/types/web3-v1-contracts/coreAbi";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import chromium from "chrome-aws-lambda";
import { NextApiResponse } from "next";
import { AbiItem } from "web3-utils";

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
  const scriptInfo = await coreContract.methods
    .projectScriptInfo(projectId)
    .call();
  let script = "";
  for (let i = 0; i < Number(scriptInfo.scriptCount); i++) {
    const s = await coreContract.methods
      .projectScriptByIndex(projectId, i)
      .call();
    script += s;
  }
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

// consolidate all of these to a shared import somewhere
const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);
const coreContract = new web3.eth.Contract(
  coreAbi as AbiItem[],
  coreContractAddress
) as unknown as CoreAbi;

export default async function handler(
  req: { query: { tokenId: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId as string;
  res.send(await getSVG(tokenId));
}
