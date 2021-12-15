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

export { coreAbi, minterAbi };
