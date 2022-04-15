import { alchemyApiUrl, coreContractAddress } from "@/config/index";
import { CoreAbi__factory } from "@/types/ethers-contracts";
import { ethers } from "ethers";

const provider = new ethers.providers.JsonRpcProvider(alchemyApiUrl);
export const core = CoreAbi__factory.connect(coreContractAddress, provider);

export type ProjectDetails = {
  projectName: string;
  artist: string;
  description: string;
  website: string;
  license: string;
};

export type BigNumberString = string;

export type ProjectTokenInfo = {
  artistAddress: string;
  pricePerTokenInWei: BigNumberString;
  invocations: BigNumberString;
  maxInvocations: BigNumberString;
  active: boolean;
  additionalPayee: string;
  additionalPayeePercentage: BigNumberString;
  currency: string;
  currencyAddress: string;
};

export type ProjectScriptInfo = {
  scriptJSON: string;
  scriptCount: BigNumberString;
  ipfsHash: string;
  locked: boolean;
  paused: boolean;
};

export const getProjectDetails = async (
  projectId: string
): Promise<ProjectDetails> => {
  const details = await core.projectDetails(projectId);
  return {
    projectName: details.projectName,
    artist: details.artist,
    description: details.description,
    website: details.website,
    license: details.license,
  };
};

export const getProjectTokenInfo = async (
  projectId: string
): Promise<ProjectTokenInfo> => {
  const resp = await core.projectTokenInfo(projectId);
  return {
    artistAddress: resp.artistAddress,
    pricePerTokenInWei: resp.pricePerTokenInWei.toString(),
    invocations: resp.invocations.toString(),
    maxInvocations: resp.maxInvocations.toString(),
    active: resp.active,
    additionalPayee: resp.additionalPayee,
    additionalPayeePercentage: resp.additionalPayeePercentage.toString(),
    currency: resp.currency,
    currencyAddress: resp.currencyAddress,
  };
};

export const getProjectScriptInfo = async (
  projectId: string
): Promise<ProjectScriptInfo> => {
  const resp = await core.projectScriptInfo(projectId);
  return {
    scriptJSON: resp.scriptJSON,
    scriptCount: resp.scriptCount.toString(),
    ipfsHash: resp.ipfsHash,
    locked: resp.locked,
    paused: resp.paused,
  };
};
