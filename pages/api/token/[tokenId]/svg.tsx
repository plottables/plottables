import { getSVG } from "@/lib/render";
import { NextApiResponse } from "next";

export default async function handler(
  req: { query: { tokenId: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId as string;
  res.send(await getSVG(tokenId));
}
