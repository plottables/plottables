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
  NonPayableTransactionObject,
  PayableTransactionObject,
} from "./types";

interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export interface MinterAbi extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MinterAbi;
  clone(): MinterAbi;
  methods: {
    artistSetBonusContractAddress(
      _projectId: number | string | BN,
      _bonusContractAddress: string
    ): NonPayableTransactionObject<void>;

    artistToggleBonus(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    checkYourAllowanceOfProjectERC20(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<string>;

    contractFilterProject(
      arg0: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    genArtCoreContract(): NonPayableTransactionObject<string>;

    getYourBalanceOfProjectERC20(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<string>;

    ownerAddress(): NonPayableTransactionObject<string>;

    ownerPercentage(): NonPayableTransactionObject<string>;

    projectIdToBonus(
      arg0: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    projectIdToBonusContractAddress(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectMaxHasBeenInvoked(
      arg0: number | string | BN
    ): NonPayableTransactionObject<boolean>;

    projectMaxInvocations(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectMintCounter(
      arg0: string,
      arg1: number | string | BN
    ): NonPayableTransactionObject<string>;

    projectMintLimit(
      arg0: number | string | BN
    ): NonPayableTransactionObject<string>;

    purchase(
      _projectId: number | string | BN
    ): PayableTransactionObject<string>;

    purchaseTo(
      _to: string,
      _projectId: number | string | BN
    ): PayableTransactionObject<string>;

    setOwnerAddress(_ownerAddress: string): NonPayableTransactionObject<void>;

    setOwnerPercentage(
      _ownerPercentage: number | string | BN
    ): NonPayableTransactionObject<void>;

    setProjectMaxInvocations(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;

    setProjectMintLimit(
      _projectId: number | string | BN,
      _limit: number | string | BN
    ): NonPayableTransactionObject<void>;

    toggleContractFilter(
      _projectId: number | string | BN
    ): NonPayableTransactionObject<void>;
  };
  events: {
    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };
}
