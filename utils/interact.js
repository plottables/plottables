import { coreAbi, coreContractAddress } from "@/config/index";
import Web3 from "web3";

const web3 = new Web3(Web3.givenProvider);
const coreContract = new web3.eth.Contract(coreAbi, coreContractAddress);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      return { address: addressArray[0] };
    } catch (err) {
      return { address: "" };
    }
  } else {
    return { address: "" };
  }
};

export const getCurrentWalletConnected = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return { address: addressArray[0] };
      } else {
        return { address: "" };
      }
    } catch (err) {
      return { address: "" };
    }
  } else {
    return { address: "" };
  }
};

export const updateProjectName = async (
  walletAddress,
  projectId,
  projectName
) => {
  return coreContract.methods
    .updateProjectName(projectId, projectName)
    .send({ from: walletAddress });
};
export const updateProjectArtistName = async (
  walletAddress,
  projectId,
  projectArtistName
) => {
  return coreContract.methods
    .updateProjectArtistName(projectId, projectArtistName)
    .send({ from: walletAddress });
};
export const updateProjectWebsite = async (
  walletAddress,
  projectId,
  projectWebsite
) => {
  return coreContract.methods
    .updateProjectWebsite(projectId, projectWebsite)
    .send({ from: walletAddress });
};
export const updateProjectDescription = async (
  walletAddress,
  projectId,
  projectDescription
) => {
  return coreContract.methods
    .updateProjectDescription(projectId, projectDescription)
    .send({ from: walletAddress });
};
export const updateProjectLicense = async (
  walletAddress,
  projectId,
  projectLicense
) => {
  return coreContract.methods
    .updateProjectLicense(projectId, projectLicense)
    .send({ from: walletAddress });
};
