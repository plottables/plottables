/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { EventEmitter } from "events";
import { EventLog } from "web3-core";
import { ContractOptions } from "web3-eth-contract";
import {
  BaseContract,
  BlockType,
  Callback,
  ContractEventLog,
  NonPayableTransactionObject,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type Approval = ContractEventLog<{
  owner: string;
  approved: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;
export type ApprovalForAll = ContractEventLog<{
  owner: string;
  operator: string;
  approved: boolean;
  0: string;
  1: string;
  2: boolean;
}>;
export type Mint = ContractEventLog<{
  _to: string;
  _tokenId: string;
  _projectId: string;
  0: string;
  1: string;
  2: string;
}>;
export type Transfer = ContractEventLog<{
  from: string;
  to: string;
  tokenId: string;
  0: string;
  1: string;
  2: string;
}>;

export interface CoreAbi extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): CoreAbi;
  clone(): CoreAbi;
  methods: {
    addMintWhitelisted(_address: string): NonPayableTransactionObject<void>;

    addProject(
      _projectName: string,
      _artistAddress: string,
      _pricePerTokenInWei: number | string | BN
    ): NonPayableTransactionObject<void>;

    addProjectScript(
      _projectId: number | string | BN,
      _script: string
    ): NonPayableTransactionObject<void>;

    addWhitelisted(_address: string): NonPayableTransactionObject<void>;

    admin(): NonPayableTransactionObject<string>;

    approve(
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    balanceOf(owner: string): NonPayableTransactionObject<string>;

    getApproved(
      tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    getRoyaltyData(
      _tokenId: number | string | BN
    ): NonPayableTransactionObject<{
      artistAddress: string;
      additionalPayee: string;
      additionalPayeePercentage: string;
      royaltyFeeByID: string;
      0: string;
      1: string;
      2: string;
      3: string;
    }>;

    hashToTokenId(arg0: string | number[]): NonPayableTransactionObject<string>;

    isApprovedForAll(
      owner: string,
      operator: string
    ): NonPayableTransactionObject<boolean>;

    isMintWhitelisted(arg0: string): NonPayableTransactionObject<boolean>;

    isWhitelisted(arg0: string): NonPayableTransactionObject<boolean>;

    mint(
      _to: string,
      _projectId: number | string | BN,
      _by: string
    ): NonPayableTransactionObject<string>;

    name(): NonPayableTransactionObject<string>;

    nextProjectId(): NonPayableTransactionObject<string>;

    ownerOf(tokenId: number | string | BN): NonPayableTransactionObject<string>;

    projectDetails(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<{
      projectName: string;
      artist: string;
      description: string;
      website: string;
      license: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: string;
    }>;

    projectIdToAdditionalPayee(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToAdditionalPayeePercentage(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToArtistAddress(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToCurrencyAddress(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToCurrencySymbol(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToPricePerTokenInWei(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectIdToSecondaryMarketRoyaltyPercentage(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectScriptByIndex(
      _projectId: number | string | BN,
      _index: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectScriptInfo(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<{
      scriptJSON: string;
      scriptCount: string;
      ipfsHash: string;
      locked: boolean;
      paused: boolean;
      0: string;
      1: string;
      2: string;
      3: boolean;
      4: boolean;
    }>;

    projectTokenInfo(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<{
      artistAddress: string;
      pricePerTokenInWei: string;
      invocations: string;
      maxInvocations: string;
      active: boolean;
      additionalPayee: string;
      additionalPayeePercentage: string;
      currency: string;
      currencyAddress: string;
      0: string;
      1: string;
      2: string;
      3: string;
      4: boolean;
      5: string;
      6: string;
      7: string;
      8: string;
    }>;

    projectURIInfo(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<string>;

    randomizerContract(): NonPayableTransactionObject<string>;

    removeMintWhitelisted(_address: string): NonPayableTransactionObject<void>;

    removeProjectLastScript(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    removeWhitelisted(_address: string): NonPayableTransactionObject<void>;

    renderProviderAddress(): NonPayableTransactionObject<string>;

    renderProviderPercentage(): NonPayableTransactionObject<string>;

    "safeTransferFrom(address,address,uint256)"(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    "safeTransferFrom(address,address,uint256,bytes)"(
      from: string,
      to: string,
      tokenId: number | string | BN,
      _data: string | number[]
    ): NonPayableTransactionObject<void>;

    setApprovalForAll(
      to: string,
      approved: boolean
    ): NonPayableTransactionObject<void>;

    supportsInterface(
      interfaceId: string | number[]
    ): NonPayableTransactionObject<boolean>;

    symbol(): NonPayableTransactionObject<string>;

    toggleProjectIsActive(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    toggleProjectIsLocked(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    toggleProjectIsPaused(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    tokenByIndex(
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenIdToHash(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenIdToProjectId(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenOfOwnerByIndex(
      owner: string,
      index: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokenURI(
      _tokenId: number | string | BN
    ): NonPayableTransactionObject<string>;

    tokensOfOwner(owner: string): NonPayableTransactionObject<string[]>;

    totalSupply(): NonPayableTransactionObject<string>;

    transferFrom(
      from: string,
      to: string,
      tokenId: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateAdmin(_adminAddress: string): NonPayableTransactionObject<void>;

    updateProjectAdditionalPayeeInfo(
      _projectId: number | string | BN,
      _additionalPayee: string,
      _additionalPayeePercentage: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateProjectArtistAddress(
      _projectId: number | string | BN,
      _artistAddress: string
    ): NonPayableTransactionObject<void>;

    updateProjectArtistName(
      _projectId: number | string | BN,
      _projectArtistName: string
    ): NonPayableTransactionObject<void>;

    updateProjectBaseURI(
      _projectId: number | string | BN,
      _newBaseURI: string
    ): NonPayableTransactionObject<void>;

    updateProjectCurrencyInfo(
      _projectId: number | string | BN,
      _currencySymbol: string,
      _currencyAddress: string
    ): NonPayableTransactionObject<void>;

    updateProjectDescription(
      _projectId: number | string | BN,
      _projectDescription: string
    ): NonPayableTransactionObject<void>;

    updateProjectIpfsHash(
      _projectId: number | string | BN,
      _ipfsHash: string
    ): NonPayableTransactionObject<void>;

    updateProjectLicense(
      _projectId: number | string | BN,
      _projectLicense: string
    ): NonPayableTransactionObject<void>;

    updateProjectMaxInvocations(
      _projectId: number | string | BN,
      _maxInvocations: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateProjectName(
      _projectId: number | string | BN,
      _projectName: string
    ): NonPayableTransactionObject<void>;

    updateProjectPricePerTokenInWei(
      _projectId: number | string | BN,
      _pricePerTokenInWei: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateProjectScript(
      _projectId: number | string | BN,
      _scriptId: number | string | BN,
      _script: string
    ): NonPayableTransactionObject<void>;

    updateProjectScriptJSON(
      _projectId: number | string | BN,
      _projectScriptJSON: string
    ): NonPayableTransactionObject<void>;

    updateProjectSecondaryMarketRoyaltyPercentage(
      _projectId: number | string | BN,
      _secondMarketRoyalty: number | string | BN
    ): NonPayableTransactionObject<void>;

    updateProjectWebsite(
      _projectId: number | string | BN,
      _projectWebsite: string
    ): NonPayableTransactionObject<void>;

    updateRandomizerAddress(
      _randomizerAddress: string
    ): NonPayableTransactionObject<void>;

    updateRenderProviderAddress(
      _renderProviderAddress: string
    ): NonPayableTransactionObject<void>;

    updateRenderProviderPercentage(
      _renderProviderPercentage: number | string | BN
    ): NonPayableTransactionObject<void>;
  };
  events: {
    Approval(cb?: Callback<Approval>): EventEmitter;
    Approval(options?: EventOptions, cb?: Callback<Approval>): EventEmitter;

    ApprovalForAll(cb?: Callback<ApprovalForAll>): EventEmitter;
    ApprovalForAll(
      options?: EventOptions,
      cb?: Callback<ApprovalForAll>
    ): EventEmitter;

    Mint(cb?: Callback<Mint>): EventEmitter;
    Mint(options?: EventOptions, cb?: Callback<Mint>): EventEmitter;

    Transfer(cb?: Callback<Transfer>): EventEmitter;
    Transfer(options?: EventOptions, cb?: Callback<Transfer>): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "Approval", cb: Callback<Approval>): void;
  once(event: "Approval", options: EventOptions, cb: Callback<Approval>): void;

  once(event: "ApprovalForAll", cb: Callback<ApprovalForAll>): void;
  once(
    event: "ApprovalForAll",
    options: EventOptions,
    cb: Callback<ApprovalForAll>
  ): void;

  once(event: "Mint", cb: Callback<Mint>): void;
  once(event: "Mint", options: EventOptions, cb: Callback<Mint>): void;

  once(event: "Transfer", cb: Callback<Transfer>): void;
  once(event: "Transfer", options: EventOptions, cb: Callback<Transfer>): void;
}
