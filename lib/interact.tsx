import coreAbi from "@/config/coreAbi.json";
import erc20Abi from "@/config/erc20Abi.json";
import {coreContractAddress, minterContractAddress, networkChainId} from "@/config/index";
import minterAbi from "@/config/minterAbi.json";
import { ethers } from "ethers";

declare const window: any;

const chainId = networkChainId;

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
    // todo: display ens name instead of wallet address
    const ensName = await provider.lookupAddress(userAddress);
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
    // todo: display ens name instead of wallet address
    const ensName = await provider.lookupAddress(userAddress);
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
    parseInt(invocations) >= parseInt(maxInvocations) ||
    (userAddress != address && (paused || !active))
  ) {
    // Disable purchase
    return;
  }

  const NULL_ADDRESS = "0x0000000000000000000000000000000000000000";
  const projectUsesErc20 = currencyAddress && currencyAddress !== NULL_ADDRESS;
  if (projectUsesErc20) {
    // Set up ERC-20 contract
    const erc20 = new ethers.Contract(currencyAddress, erc20Abi, signer);

    // Check that the user has the required amount of ERC-20
    const balance = await erc20.balanceOf(userAddress);
    if (balance.lt(pricePerTokenInWei)) {
      // Show insufficent funds error
      return;
    }

    // Check allowance for minterAddress allowed by user
    const allowance = await erc20.allowance(userAddress, minterContractAddress);

    // If the user has not yet allowed enough of their ERC-20 to be used
    // by the minter, have them approve enough.
    if (allowance.lt(pricePerTokenInWei)) {
      // Trigger user wallet dialogue. This should be done in response to user interaction.
      const approveTransaction = await erc20.approve(
        minterContractAddress,
        pricePerTokenInWei
      );
      // Wait for approve transaction confirmation
      await approveTransaction.wait(1);
    }
  }

  // Set up minter contract connected to users wallet
  const minterContract = new ethers.Contract(
    minterContractAddress,
    minterAbi,
    signer
  );

  // Initiate purchase transaction (user must confirm through metamask).
  // If paying in ether, we must include a payable value otherwise payable value will be 0.
  return await minterContract.purchase(projectId, {
    value: projectUsesErc20 ? "0" : pricePerTokenInWei,
  });
};

export const waitForConfirmation = async (
  transaction: {
    wait: (arg0: number) => any;
  },
  blockNumber: number
) => {
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
  const receipt = await transaction.wait(blockNumber);

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
