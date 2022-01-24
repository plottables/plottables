import { liveBaseUrl } from "@/config/index";

export default async function handler(
  req: { query: { tokenId: any } },
  res: { send: (arg0: string) => void }
) {
  const { tokenId } = req.query;

  let html: string;
  if (tokenId === "welcome") {
    html = `
      <html>
        <head>
          <script>
              const event = new DragEvent('drop', { preventDefault: function () {} });
              fetch('/logo.svg')
                  .then(r => r.text())
                  .then(t => new Blob([t], {type: 'image/svg+xml'}))
                  .then(b => Object.defineProperty(event.constructor.prototype, 'dataTransfer', { value: { items: [ {getAsFile: function () { return b; } } ] } }))
                  .then(e => document.body.dispatchEvent(event));
          </script>
        </head>
        <body>
          <div id='app'></div>
          <script type="text/javascript" src="/saxi/plot.js"></script>
        </body>
      </html>
    `;
  } else {
    const htmlResponse = await fetch(`${liveBaseUrl}${tokenId}`);
    html = await htmlResponse.text();

    const split1 = html.indexOf("<script>let tokenData = {");
    html = `${html.substring(
      0,
      split1
    )}<script>let tokenData = {"plot":true,${html.substring(split1 + 25)}`;

    const body = `<body>
    <div id='app'></div>
    <script type="text/javascript" src="/saxi/plot.js"></script>
    <script>
      const observer = new MutationObserver((mutationList, observer) => {
      mutationList.forEach((mutation) => {
        mutation.addedNodes.forEach(addedNode => {
          if (addedNode.tagName === "svg") {
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
    </script>`;
    const split2 = html.indexOf("<body>");
    if (split2 != -1) {
      html = `${html.substring(0, split2)}${body}${html.substring(split2 + 6)}`;
    } else {
      html = `${html.substring(0, html.length - 7)}${body}</body></html>`;
    }
  }

  res.send(html);
}
