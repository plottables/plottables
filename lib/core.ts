import { coreContractAddress } from "@/config/index";
import { CORE__factory } from "@/types/ethers-contracts";
import { ethers } from "ethers";

const ALCHEMY_HOST = `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;

const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_HOST);
export const core = CORE__factory.connect(coreContractAddress, provider);

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
