import { getPNG } from "@/lib/render";
import { NextApiResponse } from "next";

export default async function handler(
  req: { query: { tokenId: string; width: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId;
  const width = req.query.width || "1920";
  const imageBuffer = await getPNG(tokenId, width);
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", imageBuffer.length);
  res.end(imageBuffer);
}
