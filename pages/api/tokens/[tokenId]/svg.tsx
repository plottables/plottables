import { NextApiResponse } from "next";
import {getSVG} from "@/lib/render";

export default async function handler(
  req: { query: { tokenId: string } },
  res: NextApiResponse
) {
  const tokenId = req.query.tokenId as string;
  res.send(await getSVG(tokenId));
}
