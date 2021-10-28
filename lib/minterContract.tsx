import minterAbi from "@/config/minterAbi.json";
import { ProjectDetails, ProjectID, ProjectTokenInfo } from "@/lib/types";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
import { minterContractAddress } from "../config";
import { Abi } from "../types/web3-v1-contracts/abi";

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);

const minterContract = new web3.eth.Contract(
  minterAbi as AbiItem[],
  minterContractAddress
) as unknown as Abi;

export default minterContract;

export async function getProjectDetails(
  projectId: ProjectID
): Promise<ProjectDetails> {
  return _serialize(
    await minterContract.methods.projectDetails(projectId).call()
  );
}

export async function getProjectTokenInfo(
  projectId: ProjectID
): Promise<ProjectTokenInfo> {
  return _serialize(
    await minterContract.methods.projectTokenInfo(projectId).call()
  );
}

export async function getProjectShowAllTokens(
  projectId: ProjectID
): Promise<string[]> {
  return _serialize(
    await minterContract.methods.projectShowAllTokens(projectId).call()
  );
}

export async function getTokensOfOwner(address: string): Promise<string[]> {
  return _serialize(await minterContract.methods.tokensOfOwner(address).call());
}

export async function getTokenIdToProjectId(tokenId: string): Promise<string> {
  return _serialize(
    await minterContract.methods.tokenIdToProjectId(tokenId).call()
  );
}

export async function getOwnerOf(tokenId: string): Promise<string> {
  return _serialize(await minterContract.methods.ownerOf(tokenId).call());
}

// For some reason the results from `.call()` are not serializable as json via nextjs. So this is to force it.
function _serialize(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
