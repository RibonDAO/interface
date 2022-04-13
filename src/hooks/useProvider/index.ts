import { useMemo } from "react";
import { Web3Provider, getDefaultProvider } from "@ethersproject/providers";

export function useProvider() {
  return useMemo(() => {
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new Web3Provider(ethereum, "any");

        return provider;
      } else {
        const provider = new Web3Provider(getDefaultProvider("any") as any);

        return provider;
      }
    } catch (e) {
      console.log(e);
    }

    return null;
  }, [window.ethereum]);
}
