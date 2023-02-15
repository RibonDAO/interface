import { getLocalStorageItem } from "lib/localStorage";
import { User } from "@ribon.io/shared/types";
import { CURRENT_USER_KEY } from "contexts/currentUserContext";

export function currentUserFromStorage(): User | null {
  const userFromStorage = getLocalStorageItem(CURRENT_USER_KEY);
  if (!userFromStorage || userFromStorage === "undefined") return null;

  return JSON.parse(userFromStorage);
}
