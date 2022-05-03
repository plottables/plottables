import coreAbi from "./coreAbi.json";
import minterAbi from "./minterAbi.json";

export const coreContractAddress =
  process.env.NEXT_PUBLIC_ETH_NETWORK === "main"
    ? "0xa319C382a702682129fcbF55d514E61a16f97f9c"
    : "0xd10e3DEe203579FcEE90eD7d0bDD8086F7E53beB";

export const minterContractAddress =
  process.env.NEXT_PUBLIC_ETH_NETWORK === "main"
    ? "0x463B8CED7D22a55Aa4A5d69EF6a54a08AA0feB93"
    : "0x17D34c3C10eDE845D1875eA0Db4293BFEd9d4971";

export const imageBaseUrl =
  process.env.NEXT_PUBLIC_ETH_NETWORK === "main"
    ? "https://plottables-mainnet.s3.amazonaws.com/"
    : "https://plottables-staging.s3.amazonaws.com/";

export const liveBaseUrl =
  process.env.NEXT_PUBLIC_ETH_NETWORK === "main"
    ? `https://generator.artblocks.io/${coreContractAddress}/`
    : `https://generator-staging.artblocks.io/${coreContractAddress}/`;

export const alchemyApiUrl =
  process.env.NEXT_PUBLIC_ETH_NETWORK === "main"
    ? `https://eth-mainnet.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`
    : `https://eth-ropsten.alchemyapi.io/v2/${process.env.ALCHEMY_API_KEY}`;

export const calendar = {
  0: "12/10/2021 2:00:00 PM EST",
  1: "12/10/2021 2:00:00 PM EST",
  2: "1/24/2022 12:00:00 PM EST",
  3: "2/3/2022 1:00:00 PM EST",
  4: "2/9/2022 3:00:00 PM EST",
  5: "2/16/2022 2:00:00 PM EST",
  6: "2/23/2022 12:00:00 PM EST",
  7: "3/9/2022 1:00:00 PM EST",
  8: "3/2/2022 2:00:00 PM EST",
  9: "3/30/2022 3:00:00 PM EDT",
  10: "5/5/2022 5:00:00 PM EDT",
};

export const darkblockProjects = [8];

export { coreAbi, minterAbi };
