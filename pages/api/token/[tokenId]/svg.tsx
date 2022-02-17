import { liveBaseUrl } from "@/config/index";

export default async function handler(
  req: { query: { tokenId: any } },
  res: { send: (arg0: string) => void }
) {
  const { tokenId } = req.query;

  const htmlResponse = await fetch(`${liveBaseUrl}${tokenId}`);
  let html = await htmlResponse.text();

  // add plot boolean to tokenData
  const split1 = html.indexOf("<script>let tokenData = {");
  html = `${html.substring(
    0,
    split1
  )}<script>let tokenData = {"plot":true,${html.substring(split1 + 25)}`;

  const body = `<body>
  <script>
    const observer = new MutationObserver((mutationList, observer) => {
    mutationList.forEach((mutation) => {
      mutation.addedNodes.forEach(addedNode => {
        if (addedNode.tagName === "svg") {
          addedNode.setAttribute("xmlns", "http://www.w3.org/2000/svg");
          let svg = addedNode.outerHTML;
          let file = new Blob([svg], { type: 'plain/text' });
          let a = document.createElement("a"), url = URL.createObjectURL(file);

          a.href = url;
          a.download = '${tokenId}.svg';
          document.body.appendChild(a);
          a.click();

          setTimeout(function() 
          {
              document.body.removeChild(a);
              window.URL.revokeObjectURL(url);
          }, 0); 
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

  res.send(html);
}
