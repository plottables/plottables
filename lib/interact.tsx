import coreAbi from "@/config/coreAbi.json";
import { coreContractAddress, minterContractAddress } from "@/config/index";
import minterAbi from "@/config/minterAbi.json";
import { ethers } from "ethers";

declare const window: any;

const networkName =
  process.env.NEXT_PUBLIC_ETH_NETWORK == "main" ? "homestead" : "ropsten";
const chainId = process.env.NEXT_PUBLIC_ETH_NETWORK == "main" ? "0x1" : "0x3";

export const connectWallet = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    await provider.send("wallet_switchEthereumChain", [
      {
        chainId: chainId,
      },
    ]);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    return { address: userAddress.toLowerCase() };
  } catch (err) {
    return { address: "" };
  }
};

export const getCurrentWalletConnected = async () => {
  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("wallet_switchEthereumChain", [
      {
        chainId: chainId,
      },
    ]);
    const signer = provider.getSigner();
    const userAddress = await signer.getAddress();
    return { address: userAddress.toLowerCase() };
  } catch (err) {
    return { address: "" };
  }
};

export const purchase = async (projectId: string) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  const userAddress = await signer.getAddress();

  const coreContract = new ethers.Contract(
    coreContractAddress,
    coreAbi,
    provider
  );
  const { paused } = await coreContract.projectScriptInfo(projectId);
  const {
    invocations,
    maxInvocations,
    pricePerTokenInWei,
    active,
    currencyAddress,
  } = await coreContract.projectTokenInfo(projectId);
  const address = await coreContract.projectIdToArtistAddress(projectId);

  if (
    ((!paused && active) || userAddress == address) &&
    parseInt(invocations) < parseInt(maxInvocations)
  ) {
    // Set up minter contract connected to users wallet
    const minterContract = new ethers.Contract(
      minterContractAddress,
      minterAbi,
      signer
    );

    // Initiate purchase transaction (user must confirm through metamask).
    // If paying in ether, we must include a payable value otherwise payable value will be 0.
    return await minterContract.purchase(projectId, {
      value: pricePerTokenInWei,
    });
  } else {
    return;
  }
};

export const waitForConfirmation = async (transaction: {
  wait: (arg0: number) => any;
}) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const coreContract = new ethers.Contract(
    coreContractAddress,
    coreAbi,
    provider
  );
  // Wait for the transaction to be confirmed. The number passed to the wait function specifies the
  // number of block confirmations to wait for.  You may want to wait longer than a single
  // block to prevent showing the wrong output in case of a chain reorg. The Art Blocks site
  // waits for 3 block confirmations.
  const receipt = await transaction.wait(3);

  // Iterate through events to find mint event
  const mintEvent = (receipt.events || []).find(
    (receiptEvent: { topics: string[] }) => {
      const event = coreContract.interface.getEvent(receiptEvent.topics[0]);
      return event && event.name === "Mint";
    }
  );

  // Decode the mint event
  const mintEventDecoded = coreContract.interface.decodeEventLog(
    "Mint",
    mintEvent.data,
    mintEvent.topics
  );

  // Token ID as BigNumber object
  const tokenIdBigNum = mintEventDecoded["_tokenId"];

  // Token ID as string
  return tokenIdBigNum.toString();
};
