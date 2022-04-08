import { useMemo } from "react";
import { Web3Provider } from "@ethersproject/providers";
import { logError } from "services/crashReport";

export function useWeb3Provider(): Web3Provider | null {
  return useMemo(() => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        return provider;
      }

      return null;
    } catch (error) {
      logError(error);
      return null;
    }
  }, []) as Web3Provider;
}
