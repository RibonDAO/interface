import { SHA256 } from "crypto-js";
import { URL_SIGNATURE_KEY } from "utils/constants";

export const generateUrlSignature = (url: string): string => {
  const signature = SHA256(`${url}${URL_SIGNATURE_KEY}`).toString();

  return signature;
};

export const verifyUrlSignature = (url: string, signature: string): boolean => {
  const generatedSignature = generateUrlSignature(url);

  return signature === generatedSignature;
};
