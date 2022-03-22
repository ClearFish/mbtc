/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import { FunctionFragment, Result, EventFragment } from "@ethersproject/abi";
import { Listener, Provider } from "@ethersproject/providers";
import { TypedEventFilter, TypedEvent, TypedListener, OnEvent } from "./common";

export interface ZapInterface extends utils.Interface {
  functions: {
    "OHM()": FunctionFragment;
    "ZapBond(address,uint256,address,address,bytes,address,uint256,uint256)": FunctionFragment;
    "ZapStake(address,uint256,address,uint256,address,bytes,address)": FunctionFragment;
    "affiliateBalance(address,address)": FunctionFragment;
    "affiliates(address)": FunctionFragment;
    "affilliateWithdraw(address[])": FunctionFragment;
    "approvedTargets(address)": FunctionFragment;
    "depo()": FunctionFragment;
    "feeWhitelist(address)": FunctionFragment;
    "gOHM()": FunctionFragment;
    "goodwill()": FunctionFragment;
    "owner()": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "sOHM()": FunctionFragment;
    "setApprovedTargets(address[],bool[])": FunctionFragment;
    "set_affiliate(address,bool)": FunctionFragment;
    "set_feeWhitelist(address,bool)": FunctionFragment;
    "set_new_affiliateSplit(uint256)": FunctionFragment;
    "set_new_goodwill(uint256)": FunctionFragment;
    "staking()": FunctionFragment;
    "stopped()": FunctionFragment;
    "toggleContractActive()": FunctionFragment;
    "totalAffiliateBalance(address)": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
    "update_Depo(address)": FunctionFragment;
    "update_Staking(address)": FunctionFragment;
    "withdrawTokens(address[])": FunctionFragment;
  };

  encodeFunctionData(functionFragment: "OHM", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "ZapBond",
    values: [string, BigNumberish, string, string, BytesLike, string, BigNumberish, BigNumberish],
  ): string;
  encodeFunctionData(
    functionFragment: "ZapStake",
    values: [string, BigNumberish, string, BigNumberish, string, BytesLike, string],
  ): string;
  encodeFunctionData(functionFragment: "affiliateBalance", values: [string, string]): string;
  encodeFunctionData(functionFragment: "affiliates", values: [string]): string;
  encodeFunctionData(functionFragment: "affilliateWithdraw", values: [string[]]): string;
  encodeFunctionData(functionFragment: "approvedTargets", values: [string]): string;
  encodeFunctionData(functionFragment: "depo", values?: undefined): string;
  encodeFunctionData(functionFragment: "feeWhitelist", values: [string]): string;
  encodeFunctionData(functionFragment: "gOHM", values?: undefined): string;
  encodeFunctionData(functionFragment: "goodwill", values?: undefined): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(functionFragment: "renounceOwnership", values?: undefined): string;
  encodeFunctionData(functionFragment: "sOHM", values?: undefined): string;
  encodeFunctionData(functionFragment: "setApprovedTargets", values: [string[], boolean[]]): string;
  encodeFunctionData(functionFragment: "set_affiliate", values: [string, boolean]): string;
  encodeFunctionData(functionFragment: "set_feeWhitelist", values: [string, boolean]): string;
  encodeFunctionData(functionFragment: "set_new_affiliateSplit", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "set_new_goodwill", values: [BigNumberish]): string;
  encodeFunctionData(functionFragment: "staking", values?: undefined): string;
  encodeFunctionData(functionFragment: "stopped", values?: undefined): string;
  encodeFunctionData(functionFragment: "toggleContractActive", values?: undefined): string;
  encodeFunctionData(functionFragment: "totalAffiliateBalance", values: [string]): string;
  encodeFunctionData(functionFragment: "transferOwnership", values: [string]): string;
  encodeFunctionData(functionFragment: "update_Depo", values: [string]): string;
  encodeFunctionData(functionFragment: "update_Staking", values: [string]): string;
  encodeFunctionData(functionFragment: "withdrawTokens", values: [string[]]): string;

  decodeFunctionResult(functionFragment: "OHM", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ZapBond", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ZapStake", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "affiliateBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "affiliates", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "affilliateWithdraw", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "approvedTargets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "depo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "feeWhitelist", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "gOHM", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "goodwill", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "renounceOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "sOHM", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "setApprovedTargets", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_affiliate", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_feeWhitelist", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_new_affiliateSplit", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "set_new_goodwill", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "staking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "stopped", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "toggleContractActive", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "totalAffiliateBalance", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "transferOwnership", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update_Depo", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "update_Staking", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdrawTokens", data: BytesLike): Result;

  events: {
    "OwnershipTransferred(address,address)": EventFragment;
    "zapBond(address,address,uint256,address)": EventFragment;
    "zapStake(address,address,uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "zapBond"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "zapStake"): EventFragment;
}

export type OwnershipTransferredEvent = TypedEvent<[string, string], { previousOwner: string; newOwner: string }>;

export type OwnershipTransferredEventFilter = TypedEventFilter<OwnershipTransferredEvent>;

export type zapBondEvent = TypedEvent<
  [string, string, BigNumber, string],
  { sender: string; token: string; tokensRec: BigNumber; referral: string }
>;

export type zapBondEventFilter = TypedEventFilter<zapBondEvent>;

export type zapStakeEvent = TypedEvent<
  [string, string, BigNumber, string],
  { sender: string; token: string; tokensRec: BigNumber; referral: string }
>;

export type zapStakeEventFilter = TypedEventFilter<zapStakeEvent>;

export interface Zap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ZapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined,
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    OHM(overrides?: CallOverrides): Promise<[string]>;

    ZapBond(
      fromToken: string,
      amountIn: BigNumberish,
      principal: string,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      maxPrice: BigNumberish,
      bondId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    ZapStake(
      fromToken: string,
      amountIn: BigNumberish,
      toToken: string,
      minToToken: BigNumberish,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    affiliateBalance(arg0: string, arg1: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    affiliates(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    affilliateWithdraw(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    approvedTargets(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    depo(overrides?: CallOverrides): Promise<[string]>;

    feeWhitelist(arg0: string, overrides?: CallOverrides): Promise<[boolean]>;

    gOHM(overrides?: CallOverrides): Promise<[string]>;

    goodwill(overrides?: CallOverrides): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    sOHM(overrides?: CallOverrides): Promise<[string]>;

    setApprovedTargets(
      targets: string[],
      isApproved: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    set_affiliate(
      _affiliate: string,
      _status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    set_feeWhitelist(
      zapAddress: string,
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    set_new_affiliateSplit(
      _new_affiliateSplit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    set_new_goodwill(
      _new_goodwill: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    staking(overrides?: CallOverrides): Promise<[string]>;

    stopped(overrides?: CallOverrides): Promise<[boolean]>;

    toggleContractActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

    totalAffiliateBalance(arg0: string, overrides?: CallOverrides): Promise<[BigNumber]>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    update_Depo(
      _depo: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    update_Staking(
      _staking: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;

    withdrawTokens(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<ContractTransaction>;
  };

  OHM(overrides?: CallOverrides): Promise<string>;

  ZapBond(
    fromToken: string,
    amountIn: BigNumberish,
    principal: string,
    swapTarget: string,
    swapData: BytesLike,
    referral: string,
    maxPrice: BigNumberish,
    bondId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  ZapStake(
    fromToken: string,
    amountIn: BigNumberish,
    toToken: string,
    minToToken: BigNumberish,
    swapTarget: string,
    swapData: BytesLike,
    referral: string,
    overrides?: PayableOverrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  affiliateBalance(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;

  affiliates(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  affilliateWithdraw(
    tokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  approvedTargets(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  depo(overrides?: CallOverrides): Promise<string>;

  feeWhitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

  gOHM(overrides?: CallOverrides): Promise<string>;

  goodwill(overrides?: CallOverrides): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  sOHM(overrides?: CallOverrides): Promise<string>;

  setApprovedTargets(
    targets: string[],
    isApproved: boolean[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  set_affiliate(
    _affiliate: string,
    _status: boolean,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  set_feeWhitelist(
    zapAddress: string,
    status: boolean,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  set_new_affiliateSplit(
    _new_affiliateSplit: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  set_new_goodwill(
    _new_goodwill: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  staking(overrides?: CallOverrides): Promise<string>;

  stopped(overrides?: CallOverrides): Promise<boolean>;

  toggleContractActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  totalAffiliateBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  update_Depo(_depo: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<ContractTransaction>;

  update_Staking(
    _staking: string,
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  withdrawTokens(
    tokens: string[],
    overrides?: Overrides & { from?: string | Promise<string> },
  ): Promise<ContractTransaction>;

  callStatic: {
    OHM(overrides?: CallOverrides): Promise<string>;

    ZapBond(
      fromToken: string,
      amountIn: BigNumberish,
      principal: string,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      maxPrice: BigNumberish,
      bondId: BigNumberish,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    ZapStake(
      fromToken: string,
      amountIn: BigNumberish,
      toToken: string,
      minToToken: BigNumberish,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      overrides?: CallOverrides,
    ): Promise<BigNumber>;

    affiliateBalance(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;

    affiliates(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    affilliateWithdraw(tokens: string[], overrides?: CallOverrides): Promise<void>;

    approvedTargets(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    depo(overrides?: CallOverrides): Promise<string>;

    feeWhitelist(arg0: string, overrides?: CallOverrides): Promise<boolean>;

    gOHM(overrides?: CallOverrides): Promise<string>;

    goodwill(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    sOHM(overrides?: CallOverrides): Promise<string>;

    setApprovedTargets(targets: string[], isApproved: boolean[], overrides?: CallOverrides): Promise<void>;

    set_affiliate(_affiliate: string, _status: boolean, overrides?: CallOverrides): Promise<void>;

    set_feeWhitelist(zapAddress: string, status: boolean, overrides?: CallOverrides): Promise<void>;

    set_new_affiliateSplit(_new_affiliateSplit: BigNumberish, overrides?: CallOverrides): Promise<void>;

    set_new_goodwill(_new_goodwill: BigNumberish, overrides?: CallOverrides): Promise<void>;

    staking(overrides?: CallOverrides): Promise<string>;

    stopped(overrides?: CallOverrides): Promise<boolean>;

    toggleContractActive(overrides?: CallOverrides): Promise<void>;

    totalAffiliateBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(newOwner: string, overrides?: CallOverrides): Promise<void>;

    update_Depo(_depo: string, overrides?: CallOverrides): Promise<void>;

    update_Staking(_staking: string, overrides?: CallOverrides): Promise<void>;

    withdrawTokens(tokens: string[], overrides?: CallOverrides): Promise<void>;
  };

  filters: {
    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null,
    ): OwnershipTransferredEventFilter;
    OwnershipTransferred(previousOwner?: string | null, newOwner?: string | null): OwnershipTransferredEventFilter;

    "zapBond(address,address,uint256,address)"(
      sender?: null,
      token?: null,
      tokensRec?: null,
      referral?: null,
    ): zapBondEventFilter;
    zapBond(sender?: null, token?: null, tokensRec?: null, referral?: null): zapBondEventFilter;

    "zapStake(address,address,uint256,address)"(
      sender?: null,
      token?: null,
      tokensRec?: null,
      referral?: null,
    ): zapStakeEventFilter;
    zapStake(sender?: null, token?: null, tokensRec?: null, referral?: null): zapStakeEventFilter;
  };

  estimateGas: {
    OHM(overrides?: CallOverrides): Promise<BigNumber>;

    ZapBond(
      fromToken: string,
      amountIn: BigNumberish,
      principal: string,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      maxPrice: BigNumberish,
      bondId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    ZapStake(
      fromToken: string,
      amountIn: BigNumberish,
      toToken: string,
      minToToken: BigNumberish,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    affiliateBalance(arg0: string, arg1: string, overrides?: CallOverrides): Promise<BigNumber>;

    affiliates(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    affilliateWithdraw(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    approvedTargets(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    depo(overrides?: CallOverrides): Promise<BigNumber>;

    feeWhitelist(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    gOHM(overrides?: CallOverrides): Promise<BigNumber>;

    goodwill(overrides?: CallOverrides): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    sOHM(overrides?: CallOverrides): Promise<BigNumber>;

    setApprovedTargets(
      targets: string[],
      isApproved: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    set_affiliate(
      _affiliate: string,
      _status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    set_feeWhitelist(
      zapAddress: string,
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    set_new_affiliateSplit(
      _new_affiliateSplit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    set_new_goodwill(
      _new_goodwill: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    staking(overrides?: CallOverrides): Promise<BigNumber>;

    stopped(overrides?: CallOverrides): Promise<BigNumber>;

    toggleContractActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    totalAffiliateBalance(arg0: string, overrides?: CallOverrides): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<BigNumber>;

    update_Depo(_depo: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    update_Staking(_staking: string, overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;

    withdrawTokens(tokens: string[], overrides?: Overrides & { from?: string | Promise<string> }): Promise<BigNumber>;
  };

  populateTransaction: {
    OHM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    ZapBond(
      fromToken: string,
      amountIn: BigNumberish,
      principal: string,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      maxPrice: BigNumberish,
      bondId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    ZapStake(
      fromToken: string,
      amountIn: BigNumberish,
      toToken: string,
      minToToken: BigNumberish,
      swapTarget: string,
      swapData: BytesLike,
      referral: string,
      overrides?: PayableOverrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    affiliateBalance(arg0: string, arg1: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    affiliates(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    affilliateWithdraw(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    approvedTargets(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    depo(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    feeWhitelist(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    gOHM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    goodwill(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    renounceOwnership(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    sOHM(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    setApprovedTargets(
      targets: string[],
      isApproved: boolean[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    set_affiliate(
      _affiliate: string,
      _status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    set_feeWhitelist(
      zapAddress: string,
      status: boolean,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    set_new_affiliateSplit(
      _new_affiliateSplit: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    set_new_goodwill(
      _new_goodwill: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    staking(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    stopped(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    toggleContractActive(overrides?: Overrides & { from?: string | Promise<string> }): Promise<PopulatedTransaction>;

    totalAffiliateBalance(arg0: string, overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    update_Depo(
      _depo: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    update_Staking(
      _staking: string,
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;

    withdrawTokens(
      tokens: string[],
      overrides?: Overrides & { from?: string | Promise<string> },
    ): Promise<PopulatedTransaction>;
  };
}
