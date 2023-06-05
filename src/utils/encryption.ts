import * as CryptoJS from "crypto-js";

export function decryptString(
  encryptedString?: string,
  key?: string,
  iv?: any,
) {
  if (!encryptedString || !key || !iv) return "";
  const newKey = CryptoJS.enc.Utf8.parse(key);
  const newIv = CryptoJS.enc.Utf8.parse(iv);
  const decryptedBytes = CryptoJS.AES.decrypt(encryptedString, newKey, {
    iv: newIv,
    mode: CryptoJS.mode.CBC,
  });
  const decryptedString = decryptedBytes.toString(CryptoJS.enc.Utf8);
  return decryptedString;
}
