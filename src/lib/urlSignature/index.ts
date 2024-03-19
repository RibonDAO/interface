import { SHA256 } from "crypto-js";
import { URL_SIGNATURE_KEY } from "utils/constants";

export const generateUrlSignature = (url: string): string =>
  SHA256(`${url}${URL_SIGNATURE_KEY}`).toString();

export const verifyUrlSignature = (url: string, signature: string): boolean =>
  signature === generateUrlSignature(url);
