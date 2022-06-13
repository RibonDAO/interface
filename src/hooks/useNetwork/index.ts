import { useCallback, useEffect, useState } from "react";
import { networks } from "config/networks";
import { logError } from "services/crashReport";
import { useProvider } from "../useProvider";

export function useNetwork() {
  const [currentNetwork, setCurrentNetwork] = useState(networks[0]);
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const provider = useProvider();

  const getCurrentNetwork = useCallback(async () => {
    try {
      const providerNetwork = await provider?.getNetwork()
      if (providerNetwork) {
        const permittedNetworks = networks.filter((network) => providerNetwork.chainId === network.chainId);
        if (permittedNetworks.length > 0) {
          setCurrentNetwork(permittedNetworks[0]);
          setIsValidNetwork(true);
        }
      }
    } catch (e) {
      logError(e);
    }
  }, [provider]);

  const changeNetwork = () => {
    const defaultNetwork = networks[0];
    window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [{
          chainId: defaultNetwork.chainId,
          rpcUrls: [defaultNetwork.rpcUrls],
          chainName: defaultNetwork.chainName,
          nativeCurrency: {
              name: defaultNetwork.currencyName,
              symbol: defaultNetwork.symbolName,
              decimals: 18
          },
          blockExplorerUrls: [defaultNetwork.blockExplorerUrls]
      }]
  });
  }

  useEffect(() => {
    getCurrentNetwork();
  }, [getCurrentNetwork]);

  useEffect(() => {
    window.ethereum?.on("chainChanged", getCurrentNetwork);
  }, []);

  return {
    currentNetwork,
    isValidNetwork,
    changeNetwork,
  };
}
