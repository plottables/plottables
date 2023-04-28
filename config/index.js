import coreAbi from "./coreAbi.json";
import minterAbi from "./minterAbi.json";

const chainConfig = {
  main: {
    coreContractAddress: "0xa319C382a702682129fcbF55d514E61a16f97f9c",
    minterContractAddress: "0x463B8CED7D22a55Aa4A5d69EF6a54a08AA0feB93",
    imageBaseUrl: "https://plottables-mainnet.s3.amazonaws.com/",
    liveBaseUrl: "https://generator.artblocks.io/",
    tokenBaseUrl: "https://token.artblocks.io/",
    editProjectBaseUrl: "https://artblocks.io/engine/fullyonchain/projects/",
    alchemyApiUrl: "https://eth-mainnet.g.alchemy.com/v2/",
    networkChainId: "0x1"
  },
  ropsten: {
    coreContractAddress: "0xd10e3DEe203579FcEE90eD7d0bDD8086F7E53beB",
    minterContractAddress: "0x17D34c3C10eDE845D1875eA0Db4293BFEd9d4971",
    imageBaseUrl: "https://plottables-staging.s3.amazonaws.com/",
    liveBaseUrl: "https://generator-staging.artblocks.io",
    tokenBaseUrl: "https://token.staging.artblocks.io/",
    editProjectBaseUrl: "https://artist-staging.artblocks.io/engine/fullyonchain/projects/",
    alchemyApiUrl: "https://eth-ropsten.alchemyapi.io/v2/",
    networkChainId: "0x3"
  },
  goerli: {
    coreContractAddress: "0x9B0c67496Be8c6422fED0372be7a87707e3a6F09",
    minterContractAddress: "0x068C519D00A60CCD1830fabfe6eC428F2FDb4146",
    imageBaseUrl: "https://plottables-goerli.s3.amazonaws.com/",
    liveBaseUrl: "https://generator-staging-goerli.artblocks.io/",
    tokenBaseUrl: "https://token.staging.artblocks.io/",
    editProjectBaseUrl: "https://artist-staging.artblocks.io/engine/fullyonchain/projects/",
    alchemyApiUrl: "https://eth-goerli.g.alchemy.com/v2/",
    networkChainId: "0x5"
  },
  goerliFlex: {
    coreContractAddress: "0x48742D38a0809135EFd643c1150BfC13768C3907",
    minterContractAddress: "0x1DEC9E52f1320F7Deb29cBCd7B7d67f3dF785142",
    imageBaseUrl: "https://plottables-flex-goerli.s3.amazonaws.com/",
    liveBaseUrl: "https://generator-staging-goerli.artblocks.io/",
    tokenBaseUrl: "https://token.staging.artblocks.io/",
    editProjectBaseUrl: "https://artist-staging.artblocks.io/engine/flex/projects/",
    alchemyApiUrl: "https://eth-goerli.g.alchemy.com/v2/",
    networkChainId: "0x5"
  },
  mainFlex: {
    coreContractAddress: "0x18dE6097cE5B5B2724C9Cae6Ac519917f3F178c0",
    minterContractAddress: "0xE6E728361b7C824Cba64cc1e5323EfB7a5Bb65DA",
    imageBaseUrl: "https://plottables-flex-mainnet.s3.amazonaws.com/",
    liveBaseUrl: "https://generator.artblocks.io/",
    tokenBaseUrl: "https://token.artblocks.io/",
    editProjectBaseUrl: "https://artblocks.io/engine/flex/projects/",
    alchemyApiUrl: "https://eth-mainnet.g.alchemy.com/v2/",
    networkChainId: "0x1"
  }
}

export const coreContractAddress = chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].coreContractAddress;

export const minterContractAddress = chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].minterContractAddress;

export const imageBaseUrl = chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].imageBaseUrl;

export const liveBaseUrl = `${chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].liveBaseUrl}${coreContractAddress}/`;

export const tokenBaseUrl = `${chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].tokenBaseUrl}${coreContractAddress.toLowerCase()}/`;

export const editProjectBaseUrl = `${chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].editProjectBaseUrl}${coreContractAddress.toLowerCase()}/`;

export const alchemyApiUrl = `${chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].alchemyApiUrl}${process.env.ALCHEMY_API_KEY}`;

export const networkChainId = chainConfig[process.env.NEXT_PUBLIC_ETH_NETWORK].networkChainId;

export const flexCalendar = {
  0: "11/11/2022 2:00:00 PM CST",
};

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
  11: "5/25/2022 2:00:00 PM EDT",
  12: "6/10/2022 4:00:00 PM EDT",
  13: "12/10/2022 2:00:00 PM EST",
  14: "12/7/2022 2:00:00 PM EST",
  15: "1/30/2023 3:00:00 PM EST",
  16: "2/22/2023 12:00:00 PM EST",
  17: "4/3/2023 1:00:00 PM EDT",
  18: "3/16/2023 2:00:00 PM EDT",
  19: "3/23/2023 1:00:00 PM EDT",
  20: "5/5/2023 12:00:00 PM EDT",
};

export { coreAbi, minterAbi };
