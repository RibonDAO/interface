import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { networks } from "config/networks";
import { logError } from "services/crashReport";
import { useProvider } from "hooks/useProvider";
import CurrentNetwork from "types/entities/CurrentNetwork";
import { SUBGRAPH_URL, CHAIN_ID } from "lib/localStorage/constants";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";

export interface INetworkContext {
  isValidNetwork: boolean;
  currentNetwork: CurrentNetwork;
  getCurrentNetwork: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const NetworkContext = createContext<INetworkContext>(
  {} as INetworkContext,
);

function NetworkProvider({ children }: Props) {
  function setInitialNetwork() {
    return (
      networks.find(
        (network) =>
          network.chainId.toString() === getLocalStorageItem(CHAIN_ID),
      ) || networks[0]
    );
  }

  const [currentNetwork, setCurrentNetwork] = useState(setInitialNetwork());
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const provider = useProvider();

  const getCurrentNetwork = useCallback(async () => {
    try {
      const providerNetwork = await provider?.getNetwork();

      if (providerNetwork) {
        const permittedNetworks = networks.filter(
          (network) => providerNetwork.chainId === network.chainId,
        );
        if (permittedNetworks.length > 0) {
          setCurrentNetwork(permittedNetworks[0]);
          setIsValidNetwork(true);
        } else {
          setIsValidNetwork(false);
        }
      }
    } catch (e) {
      logError(e);
    }
  }, [provider]);

  useEffect(() => {
    getCurrentNetwork();
  }, [getCurrentNetwork]);

  useEffect(() => {
    window.ethereum?.on("chainChanged", getCurrentNetwork);
  }, [currentNetwork]);

  useEffect(() => {
    const chainChanged =
      currentNetwork.subgraphUrl !== getLocalStorageItem(SUBGRAPH_URL);
    setLocalStorageItem(SUBGRAPH_URL, currentNetwork.subgraphUrl);
    setLocalStorageItem(CHAIN_ID, currentNetwork.chainId.toString());
    if (chainChanged) {
      window.location.reload();
    }
  }, [currentNetwork.chainId]);

  const networkObject: INetworkContext = useMemo(
    () => ({
      currentNetwork,
      isValidNetwork,
      getCurrentNetwork,
    }),
    [currentNetwork, isValidNetwork],
  );

  return (
    <NetworkContext.Provider value={networkObject}>
      {children}
    </NetworkContext.Provider>
  );
}

export default NetworkProvider;

export const useNetworkContext = () => {
  const context = useContext(NetworkContext);

  if (!context) {
    throw new Error("useNetwork must be used within NetworkProvider");
  }

  return context;
};
