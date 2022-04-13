import {
  getProjectDetails,
  getProjectScriptInfo,
  getProjectTokenInfo,
  ProjectDetails,
  ProjectScriptInfo,
  ProjectTokenInfo,
} from "@/lib/core";
import type { NextApiRequest, NextApiResponse } from "next";

export type ProjectResponse = {
  project: {
    projectId: string;
    projectDetails: ProjectDetails;
    projectTokenInfo: ProjectTokenInfo;
    projectScriptInfo: ProjectScriptInfo;
  };
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ProjectResponse>
) => {
  const projectId = req.query.projectId as string;

  const project = {
    projectId: projectId,
    projectDetails: await getProjectDetails(projectId),
    projectTokenInfo: await getProjectTokenInfo(projectId),
    projectScriptInfo: await getProjectScriptInfo(projectId),
  };

  res
    .setHeader("Cache-Control", "s-maxage=1, stale-while-revalidate=59")
    .status(200)
    .json({ project: project });
};
