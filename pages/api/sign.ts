import coreAbi from "@/config/coreAbi.json";
import { coreContractAddress } from "@/config/index";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import type { NextApiRequest, NextApiResponse } from "next";
import { AbiItem } from "web3-utils";

const web3 = createAlchemyWeb3(
  `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
);

const coreContract = new web3.eth.Contract(
  coreAbi as AbiItem[],
  coreContractAddress
);

const privateKey = process.env.MINTER_PRIVATE_KEY!;

const privateAccount = web3.eth.accounts.privateKeyToAccount(privateKey);

export default async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.body);

  console.log(privateAccount);

  const projectId = 0;
  const toAddress = "0xC9604821E25E162452157c932380984F7c1f6402";

  const tx = {
    from: privateAccount.address,
    to: coreContractAddress,
    gas: 21928,
    data: coreContract.methods
      .mint(privateAccount.address, projectId, toAddress)
      .encodeABI(),
    nonce: 123,
  };

  // privateAccount.
  const sign = await privateAccount.signTransaction(tx);

  console.log(sign);

  res.status(200).json({ sign });
};
