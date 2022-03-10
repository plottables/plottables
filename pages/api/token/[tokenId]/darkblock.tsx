import coreContract from "@/lib/coreContract";

export default async function handler(
  req: { query: { tokenId: any } },
  res: { send: (arg0: string) => void }
) {
  const { tokenId } = req.query;

  const hash = await coreContract.methods.tokenIdToHash(tokenId).call();

  res.send(`
        <html>
            <head>
                <style>
                    body {
                        margin: 0;
                        padding: 0;
                    }
                </style>
            </head>
            <body>
                <div style="padding: 50px; min-height: 500px; width:792px;" id="darkblock-widget-embed"></div>
                <script id="darkblockwidget-script" src="https://d2etrwe6lfjo48.cloudfront.net/darkblock-widget.js" data-config="{'platform': 'Ethereum', 'tokenId': '${tokenId}', 'contractAddress': '0x495f947276749Ce646f68AC8c248420045cb7b5e'}"></script>
            </body>
        </html>
    `);
}
