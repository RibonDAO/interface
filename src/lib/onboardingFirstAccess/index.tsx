import { SHOW_MENU, useCurrentUser } from "contexts/currentUserContext";
import { getLocalStorageItem } from "lib/localStorage";

export function isFirtsAccess() {
    const { signedIn } = useCurrentUser();
    if (
        (signedIn &&
            getLocalStorageItem(SHOW_MENU) === "true" &&
            getLocalStorageItem("HAS_DONATED") === "true") ||
        getLocalStorageItem("HAS_DONATED") === "true"
    ) {
        return false;
    }
    return true;
}