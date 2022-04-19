import { BigNumberish, utils } from "ethers";

export function formatFromWei(wei: BigNumberish, fractionDigits = 2): string {
  return parseFloat(utils.formatEther(wei)).toFixed(fractionDigits);
}
