import { NextApiResponse } from "next";
import {getPNG} from "@/lib/render";

export default async function handler(
  req: { query: { tokenId: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId as string;
  const imageBuffer = await getPNG(tokenId);
  res.setHeader("Content-Type", "image/png");
  res.setHeader("Content-Length", imageBuffer.length);
  res.end(imageBuffer);
}
