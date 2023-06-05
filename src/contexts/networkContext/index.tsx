import {
  createContext,
  useContext,
  useMemo,
  useCallback,
  useEffect,
  useState,
} from "react";
import { logError } from "services/crashReport";
import { useProvider } from "hooks/useProvider";
import { Chain } from "@ribon.io/shared/types";
import { CHAIN_ID } from "lib/localStorage/constants";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { useChains } from "@ribon.io/shared/hooks";

export interface INetworkContext {
  isValidNetwork: boolean;
  currentNetwork?: Chain;
  permittedNetworks?: Chain[];
  getCurrentNetwork: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const NetworkContext = createContext<INetworkContext>(
  {} as INetworkContext,
);

function NetworkProvider({ children }: Props) {
  const { chains, isLoading } = useChains();

  const [currentNetwork, setCurrentNetwork] = useState<Chain | undefined>();
  const [permittedNetworks, setPermittedNetworks] = useState<
    Chain[] | undefined
  >(chains);
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const provider = useProvider();

  function setInitialNetwork() {
    return chains?.find(
      (chain) => chain.chainId.toString() === getLocalStorageItem(CHAIN_ID),
    );
  }

  const getCurrentNetwork = useCallback(async () => {
    try {
      const providerNetwork = await provider?.getNetwork();

      if (providerNetwork) {
        const permittedNetwork = chains?.filter(
          (chain) => providerNetwork.chainId === chain.chainId,
        );
        if (permittedNetwork) {
          setCurrentNetwork(permittedNetwork[0]);
          setIsValidNetwork(true);
        } else {
          setIsValidNetwork(false);
        }
      }
    } catch (e) {
      logError(e);
    }
  }, [provider, chains]);

  useEffect(() => {
    if (chains) getCurrentNetwork();
  }, [chains]);

  useEffect(() => {
    if (!isLoading) {
      setPermittedNetworks(chains);
      setCurrentNetwork(setInitialNetwork());
    }
  }, [isLoading]);

  useEffect(() => {
    window.ethereum?.on("chainChanged", getCurrentNetwork);
  }, [currentNetwork]);

  useEffect(() => {
    if (currentNetwork?.chainId)
      setLocalStorageItem(CHAIN_ID, currentNetwork?.chainId.toString());
  }, [currentNetwork]);

  const networkObject: INetworkContext = useMemo(
    () => ({
      currentNetwork,
      permittedNetworks,
      isValidNetwork,
      getCurrentNetwork,
    }),
    [currentNetwork, isValidNetwork, permittedNetworks],
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
