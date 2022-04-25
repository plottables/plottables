import {
  getProjectDetails,
  getProjectTokenInfo,
  ProjectDetails,
} from "@/lib/core";
import { BigNumber } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";

export type GalleryResponse = {
  projects: {
    projectId: string;
    projectDetails: ProjectDetails;
    projectTokenInfo: {
      artistAddress: string;
      pricePerTokenInWei: BigNumber | string;
      invocations: BigNumber | string;
      maxInvocations: BigNumber | string;
      active: boolean;
      additionalPayee: string;
      additionalPayeePercentage: BigNumber | string;
      currency: string;
      currencyAddress: string;
    };
  }[];
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<GalleryResponse>
) => {
  let projects = [];
  for (let projectId of process.env.VISIBLE_PROJECT_IDS!.split(",")) {
    projects.push({
      projectId: projectId,
      projectDetails: await getProjectDetails(projectId),
      projectTokenInfo: await getProjectTokenInfo(projectId),
    });
  }

  // trying out caching
  res
    .setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59")
    .status(200)
    .json({ projects: projects });
};
