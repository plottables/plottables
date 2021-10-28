import BN from "bn.js";

export type ProjectID = string | number | BN;

export interface ProjectDetails {
  projectName: string;
  artist: string;
  description: string;
  website: string;
  license: string;
  dynamic: boolean;
}

export interface ProjectTokenInfo {
  artistAddress: string;
  pricePerTokenInWei: string;
  invocations: string;
  maxInvocations: string;
  active: boolean;
  additionalPayee: string;
  additionalPayeePercentage: string;
  currency: string;
  currencyAddress: string;
}
