import coreAbi from "@/config/coreAbi.json";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import { AbiItem } from "web3-utils";
import { coreContractAddress } from "../config";
import { CoreAbi } from "../types/web3-v1-contracts/coreAbi";

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);

const coreContract = new web3.eth.Contract(
  coreAbi as AbiItem[],
  coreContractAddress
) as unknown as CoreAbi;

export default coreContract;

// Read methods
export async function admin(): Promise<string> {
  return _serialize(await coreContract.methods.admin().call());
}
export async function balanceOf(owner: string): Promise<string> {
  return _serialize(await coreContract.methods.balanceOf(owner).call());
}
export async function getApproved(tokenId: string): Promise<string> {
  return _serialize(await coreContract.methods.getApproved(tokenId).call());
}
export async function getRoyaltyData(tokenId: string): Promise<string> {
  return _serialize(await coreContract.methods.getRoyaltyData(tokenId).call());
}
export async function hashToTokenId(hash: string): Promise<string> {
  return _serialize(await coreContract.methods.hashToTokenId(hash).call());
}
export async function isApprovedForAll(
  owner: string,
  operator: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.isApprovedForAll(owner, operator).call()
  );
}
export async function isMintWhitelisted(address: string): Promise<string> {
  return _serialize(
    await coreContract.methods.isMintWhitelisted(address).call()
  );
}
export async function isWhitelisted(address: string): Promise<string> {
  return _serialize(await coreContract.methods.isWhitelisted(address).call());
}
export async function name(): Promise<string> {
  return _serialize(await coreContract.methods.name().call());
}
export async function nextProjectId(): Promise<string> {
  return _serialize(await coreContract.methods.nextProjectId().call());
}
export async function ownerOf(tokenId: string): Promise<string> {
  return _serialize(await coreContract.methods.ownerOf(tokenId).call());
}
export async function projectDetails(projectId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.projectDetails(projectId).call()
  );
}
export async function projectIdToAdditionalPayee(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectIdToAdditionalPayee(projectId).call()
  );
}
export async function projectIdToAdditionalPayeePercentage(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods
      .projectIdToAdditionalPayeePercentage(projectId)
      .call()
  );
}
export async function projectIdToArtistAddress(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectIdToArtistAddress(projectId).call()
  );
}
export async function projectIdToCurrencyAddress(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectIdToCurrencyAddress(projectId).call()
  );
}
export async function projectIdToCurrencySymbol(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectIdToCurrencySymbol(projectId).call()
  );
}
export async function projectIdToPricePerTokenInWei(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectIdToPricePerTokenInWei(projectId).call()
  );
}
export async function projectIdToSecondaryMarketRoyaltyPercentage(
  projectId: string
): Promise<string> {
  return _serialize(
    await coreContract.methods
      .projectIdToSecondaryMarketRoyaltyPercentage(projectId)
      .call()
  );
}
export async function projectScriptByIndex(
  projectId: string,
  index: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.projectScriptByIndex(projectId, index).call()
  );
}
export async function projectScriptInfo(projectId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.projectScriptInfo(projectId).call()
  );
}
export async function projectTokenInfo(projectId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.projectTokenInfo(projectId).call()
  );
}
export async function projectURIInfo(projectId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.projectURIInfo(projectId).call()
  );
}
export async function randomizerContract(): Promise<string> {
  return _serialize(await coreContract.methods.randomizerContract().call());
}
export async function renderProviderAddress(): Promise<string> {
  return _serialize(await coreContract.methods.renderProviderAddress().call());
}
export async function renderProviderPercentage(): Promise<string> {
  return _serialize(
    await coreContract.methods.renderProviderPercentage().call()
  );
}
export async function supportsInterface(interfaceId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.supportsInterface(interfaceId).call()
  );
}
export async function symbol(): Promise<string> {
  return _serialize(await coreContract.methods.symbol().call());
}
export async function tokenByIndex(index: string): Promise<string> {
  return _serialize(await coreContract.methods.tokenByIndex(index).call());
}
export async function tokenIdToHash(tokenId: string): Promise<string> {
  return _serialize(await coreContract.methods.tokenIdToHash(tokenId).call());
}
export async function tokenIdToProjectId(tokenId: string): Promise<string> {
  return _serialize(
    await coreContract.methods.tokenIdToProjectId(tokenId).call()
  );
}
export async function tokenOfOwnerByIndex(
  owner: string,
  index: string
): Promise<string> {
  return _serialize(
    await coreContract.methods.tokenOfOwnerByIndex(owner, index).call()
  );
}
export async function tokenURI(tokenId: string): Promise<string> {
  return _serialize(await coreContract.methods.tokenURI(tokenId).call());
}
export async function tokensOfOwner(owner: string): Promise<string> {
  return _serialize(await coreContract.methods.tokensOfOwner(owner).call());
}
export async function totalSupply(): Promise<string> {
  return _serialize(await coreContract.methods.totalSupply().call());
}

// write
// export async function updateProjectName(
//   walletAddress: string,
//   projectId: string,
//   projectName: string
// ): Promise<string> {
//   return _serialize(
//     await coreContract.methods
//       .updateProjectName(projectId, projectName)
//       .send({ from: walletAddress })
//   );
// }

// export async function testing() {
//   // const tx = await web3.eth.sendSignedTransaction("...")
//   // console.log(tx);
//
//   window.ethereum.request({
//     method: 'eth_sendRawTransaction',
//     params: ["0xf8c87b84773593fe8255a894d10e3dee203579fcee90ed7d0bdd8086f7e53beb80b8640d4d15130000000000000000000000001dbd3a213479904ad5f977995544b6c18adcee300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c9604821e25e162452157c932380984f7c1f640229a060c6a40ecb8df554399fe924f613401d301ee1aadb1a5d84f20e217899afe47ea052a2b23bbfe284fec1602d5cddc7ce4cdf4cd305167be8412e5c4d26749a53d0"]
//   })
//       .then((result) => {
//         console.log(result)
//       })
//       .catch((error) => {
//         console.log(error)
//       });
// }

// For some reason the results from `.call()` are not serializable as json via nextjs. So this is to force it.
function _serialize(value: any): any {
  return JSON.parse(JSON.stringify(value));
}
