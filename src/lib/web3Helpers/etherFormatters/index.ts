import { BigNumberish, utils } from "ethers";

export function formatFromWei(wei: BigNumberish, fractionDigits = 2): string {
  return parseFloat(utils.formatEther(wei)).toFixed(fractionDigits);
}

export function formatFromDecimals(value: BigNumberish, decimals = 6) {
  return Number(value) / 10 ** decimals;
}

export function formatToDecimals(value: BigNumberish, decimals = 6) {
  return Number(value) * 10 ** decimals;
}
