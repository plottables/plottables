import {tokenBaseUrl} from "@/config/index";
import {
    getProjectDetails,
    getProjectScriptInfo, getProjectTokenInfo,
    ProjectDetails,
    ProjectScriptInfo, ProjectTokenInfo,
} from "@/lib/core";
import { ownerOf, tokenIdToProjectId } from "@/lib/coreContract";
import type { NextApiRequest, NextApiResponse } from "next";

export type TokenResponse = {
  tokenId: string;
  ownerOf: string;
  projectId: string;
  projectTokenInfo: ProjectTokenInfo;
  projectDetails: ProjectDetails;
  projectScriptInfo: ProjectScriptInfo;
  features: Record<string, string>;
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<TokenResponse>
) => {
  const tokenId = req.query.tokenId as string;

  if (!tokenId) {
    return {
      notFound: true,
    };
  }

  const resp = await fetch(`${tokenBaseUrl}${tokenId}`);
  const data = await resp.json();

  const projectId = await tokenIdToProjectId(tokenId);

  res
    .setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=3600")
    .status(200)
    .json({
      tokenId: tokenId,
      projectId: projectId,
      projectTokenInfo: await getProjectTokenInfo(projectId),
      ownerOf: await ownerOf(tokenId),
      projectDetails: await getProjectDetails(projectId),
      projectScriptInfo: await getProjectScriptInfo(projectId),
      features: data.features ? data.features : null,
    });
};
