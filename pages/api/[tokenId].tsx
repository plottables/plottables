import coreAbi from "@/config/coreAbi.json";
import { coreContractAddress } from "@/config/index";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
import { CoreAbi } from "../../types/web3-v1-contracts/coreAbi";

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);
const coreContract = new web3.eth.Contract(
  coreAbi as AbiItem[],
  coreContractAddress
) as unknown as CoreAbi;

export default async function handler(
  req: { query: { tokenId: any } },
  res: { send: (arg0: string) => void }
) {
  const { tokenId } = req.query;

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

  res.send(`
        <html>
            <head>
                <title>${tokenId}</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
                <script>
                    let plot = false;
                    let tokenData = {"hash":"${hash}"};
                </script>
                <script>
                    ${script}
                </script>
                <style type="text/css">
                    body {
                        margin: 0;
                        padding: 0;
                        background: Grey;
                    }
                    canvas {
                        padding: 0;
                        margin: auto;
                        display: block;
                        position: absolute;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                </style>
            </head>
        </html>
    `);
}
