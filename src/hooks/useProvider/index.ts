import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { logError } from "services/crashReport";

export function useProvider() {
  return useMemo(() => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new Web3Provider(window.ethereum, "any");

        return provider;
      }
    } catch (e) {
      logError(e);
    }

    return null;
  }, [window.ethereum]);
}
