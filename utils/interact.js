import {
  coreAbi,
  coreContractAddress,
  minterAbi,
  minterContractAddress,
} from "@/config/index";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);
const minterContract = new web3.eth.Contract(minterAbi, minterContractAddress);
const coreContract = new web3.eth.Contract(coreAbi, coreContractAddress);

export const connectWallet = async () => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      let chainId = "0x1";
      if (process.env.NEXT_PUBLIC_ETH_NETWORK === "ropsten") {
        chainId = "0x3";
      }
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: chainId }],
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
        let chainId = "0x1";
        if (process.env.NEXT_PUBLIC_ETH_NETWORK === "ropsten") {
          chainId = "0x3";
        }
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
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
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectName(projectId, projectName)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectArtistName = async (
  walletAddress,
  projectId,
  projectArtistName
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectArtistName(projectId, projectArtistName)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectWebsite = async (
  walletAddress,
  projectId,
  projectWebsite
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectWebsite(projectId, projectWebsite)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectDescription = async (
  walletAddress,
  projectId,
  projectDescription
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectDescription(projectId, projectDescription)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectLicense = async (
  walletAddress,
  projectId,
  projectLicense
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectLicense(projectId, projectLicense)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectPricePerTokenInWei = async (
  walletAddress,
  projectId,
  pricePerToken
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectPricePerTokenInWei(
            projectId,
            web3.utils.toWei(pricePerToken)
          )
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectCurrencyInfo = async (
  walletAddress,
  projectId,
  currencySymbol,
  currencyAddress
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectCurrencyInfo(projectId, currencySymbol, currencyAddress)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectMaxInvocations = async (
  walletAddress,
  projectId,
  maxInvocations
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectMaxInvocations(projectId, maxInvocations)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectBaseURI = async (
  walletAddress,
  projectId,
  newBaseURI
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectBaseURI(projectId, newBaseURI)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectScriptJSON = async (
  walletAddress,
  projectId,
  scriptType,
  aspectRatio
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectScriptJSON(
            projectId,
            JSON.stringify({ scriptType: scriptType, aspectRatio: aspectRatio })
          )
          .encodeABI(),
      },
    ],
  });
};
export const addProjectScript = async (walletAddress, projectId, script) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .addProjectScript(projectId, script)
          .encodeABI(),
      },
    ],
  });
};
export const updateProjectScript = async (
  walletAddress,
  projectId,
  scriptId,
  script
) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .updateProjectScript(projectId, scriptId, script)
          .encodeABI(),
      },
    ],
  });
};
export const removeProjectLastScript = async (walletAddress, projectId) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods
          .removeProjectLastScript(projectId)
          .encodeABI(),
      },
    ],
  });
};
export const toggleProjectIsPaused = async (walletAddress, projectId) => {
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [
      {
        to: coreContractAddress,
        from: walletAddress,
        data: coreContract.methods.toggleProjectIsPaused(projectId).encodeABI(),
      },
    ],
  });
};

export const purchase = async (walletAddress, projectId, value) => {
  let chainId = "0x1";
  if (process.env.NEXT_PUBLIC_ETH_NETWORK === "ropsten") {
    chainId = "0x3";
  }
  await window.ethereum.request({
    method: "wallet_switchEthereumChain",
    params: [{ chainId: chainId }],
  });
  const txn = {
    to: minterContractAddress,
    from: walletAddress,
    data: minterContract.methods.purchase(projectId).encodeABI(),
    value: web3.utils.toHex(value),
  };
  return await window.ethereum.request({
    method: "eth_sendTransaction",
    params: [txn],
  });
};
