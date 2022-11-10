import { getLocalStorageItem } from "lib/localStorage";

export function isFirstAccess(signedIn: boolean) {
  if (
    (signedIn &&
      getLocalStorageItem("SHOW_MENU") === "true" &&
      getLocalStorageItem("HAS_DONATED") === "true") ||
    getLocalStorageItem("HAS_DONATED") === "true"
  ) {
    return false;
  }
  return true;
}
