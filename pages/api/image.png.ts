import { imageBaseUrl } from "@/config/index";
import type { NextApiRequest, NextApiResponse } from "next";
import * as stream from "stream";
import { promisify } from "util";

const pipeline = promisify(stream.pipeline);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const token = req.query.token as string;
  const resp = await fetch(imageBaseUrl + token + ".png");

  if (resp.body) {
    res
      .setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=86400")
      .status(200);

    await pipeline(resp.body, res);
  }
};
