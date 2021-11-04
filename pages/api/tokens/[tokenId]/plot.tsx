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

  let script = await getScript(projectId);

  res.send(`
        <html>
            <head>
                <title>${tokenId}</title>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.0.0/p5.min.js"></script>
                <script>
                    let tokenData = {"hash":"${hash}"};
                </script>
                <script>
                    ${script}
                </script>
                <style type="text/css">
                    body {
                        margin: 0;
                        padding: 0;
                    }
                </style>
            </head>
            <body>
                <div id='app'></div>
                <script>
                  const observer = new MutationObserver((mutationList, observer) => {
                    mutationList.forEach((mutation) => {
                      mutation.addedNodes.forEach(addedNode => {
                        if (addedNode.tagName == "svg") {
                          addedNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
                          let svgData = addedNode.outerHTML;
                          let preface = '<?xml version="1.0" standalone="no"?>\\r\\n';
                          let svgBlob = new Blob([preface, svgData], {type:"image/svg+xml;charset=utf-8"});
                          const event = new DragEvent('drop', { preventDefault: function () {} });
                          Object.defineProperty(event.constructor.prototype, 'dataTransfer', { value: { items: [ {getAsFile: function () { return svgBlob; } } ] } });
                          document.body.dispatchEvent(event);
                          addedNode.remove();
                        }
                      });
                    });
                  });
                  observer.observe(document.body, {childList: true, attributes: false, subtree: false});
                </script>
                <script type="text/javascript" src="/saxi/plot.js"></script>
            </body>
        </html>
    `);
}
