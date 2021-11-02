import coreContract from "@/lib/coreContract";
import getScript from "@/lib/getScript";

export default async function handler(
  req: { query: { tokenId: any } },
  res: { send: (arg0: string) => void }
) {
  const { tokenId } = req.query;

  const hash = await coreContract.methods.tokenIdToHash(tokenId).call();
  const projectId = await coreContract.methods
    .tokenIdToProjectId(tokenId)
    .call();
  let script = await getScript(projectId)

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
