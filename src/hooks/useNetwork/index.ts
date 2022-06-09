import { useCallback, useEffect, useState } from "react";
import { Network } from "@ethersproject/networks";
import { useProvider } from "../useProvider";

const networks = [
  {
    chainId: 0x13881,
    rpcUrls: ["https://rpc-mumbai.matic.today"],
    chainName: "Mumbai Testnet",
  },
];

export function useNetwork() {
  const [currentNetwork, setCurrentNetwork] = useState<Network>();
  const provider = useProvider();

  const getCurrentNetwork = useCallback(async () => {
    try {
      setCurrentNetwork(await provider?.getNetwork());
    } catch (e) {
      console.log(e);
    }
  }, [provider]);

  const isValidNetwork = useCallback(() => {
    if (!currentNetwork) return false;

    const networksChainIds = networks.map((network) => network.chainId);
    return networksChainIds.includes(Number(currentNetwork.chainId));
  }, [currentNetwork]);

  useEffect(() => {
    getCurrentNetwork();
  }, [getCurrentNetwork]);

  useEffect(() => {
    window.ethereum?.on("chainChanged", getCurrentNetwork);
  }, []);

  return {
    currentNetwork,
    getCurrentNetwork,
    isValidNetwork,
  };
}
