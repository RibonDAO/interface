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
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";

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
  const [currentNetwork, setCurrentNetwork] = useState(networks[0]);
  const [isValidNetwork, setIsValidNetwork] = useState(false);
  const provider = useProvider();

  const toast = useToast();

  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.networkContext",
  });

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
          toast({
            type: "error",
            message: t("invalidNetworkMessage"),
          });
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
  }, []);

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
