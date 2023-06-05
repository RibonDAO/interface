import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  checkConnectionRequest,
  connectWalletRequest,
} from "lib/walletConnector";
import { useTranslation } from "react-i18next";
import useToast from "hooks/useToast";
import { logEvent } from "lib/events";
import { utils } from "ethers";
import { useNetworkContext } from "contexts/networkContext";

export interface IWalletContext {
  wallet: string | null;
  checkIfWalletIsConnected: () => void;
  connectWallet: () => void;
  changeNetwork: () => void;
  setWallet: Dispatch<SetStateAction<string | null>>;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const WalletContext = createContext<IWalletContext>(
  {} as IWalletContext,
);

function WalletProvider({ children }: Props) {
  const [wallet, setWallet] = useState<string | null>(null);
  const toast = useToast();
  const { permittedNetworks } = useNetworkContext();
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.walletContext",
  });

  const checkIfWalletIsConnected = useCallback(async () => {
    const checkConnectionRequestResponse = await checkConnectionRequest();
    if (checkConnectionRequestResponse)
      setWallet(checkConnectionRequestResponse);
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  const addNetwork = useCallback(async () => {
    try {
      if (!permittedNetworks) return;
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainName: permittedNetworks[0].name,
            chainId: utils.hexValue(permittedNetworks[0].chainId),
            nativeCurrency: {
              name: permittedNetworks[0].currencyName,
              decimals: 18,
              symbol: permittedNetworks[0].symbolName,
            },
            rpcUrls: [permittedNetworks[0].rpcUrls],
          },
        ],
      });
    } catch (err: any) {
      if (err.code === 4001) {
        toast({
          type: "error",
          message: t("invalidNetworkMessage"),
        });
      }
    }
  }, [permittedNetworks]);

  const changeNetwork = useCallback(async () => {
    if (!permittedNetworks) return;
    const permittedNetwork = permittedNetworks.filter(
      (network) =>
        window.ethereum.networkVersion === network.chainId.toString(),
    );
    if (permittedNetwork.length === 0) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: utils.hexValue(permittedNetworks[0].chainId) }],
        });
      } catch (err: any) {
        if (err.code === 4902) {
          await addNetwork();
        }
        if (err.code === 4001) {
          toast({
            type: "error",
            message: t("invalidNetworkMessage"),
          });
        }
      }
    }
  }, [permittedNetworks]);

  const connectWallet = useCallback(async () => {
    const connectWalletResponse = await connectWalletRequest({
      onEthereumNotFound: () => {
        logEvent("toastNotification_view", {
          status: "ethereumNotFound",
        });
        toast({
          type: "error",
          message: t("ethereumNotFoundMessage"),
          link: "https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en",
        });
      },
      onUserRejectedConnection: () => {
        logEvent("toastNotification_view", {
          status: "userRejectedConnection",
        });
        toast({ type: "error", message: t("userRejectedConnectionMessage") });
      },
      onError: () => {
        logEvent("toastNotification_view", {
          status: "walletConnectionFailed",
        });
        toast({ type: "error", message: t("onErrorMessage") });
      },
    });
    if (connectWalletResponse) setWallet(connectWalletResponse);
    await changeNetwork();
  }, [permittedNetworks]);

  const walletObject: IWalletContext = useMemo(
    () => ({
      wallet,
      checkIfWalletIsConnected,
      connectWallet,
      changeNetwork,
      setWallet,
    }),
    [wallet, checkIfWalletIsConnected, connectWallet, changeNetwork],
  );

  return (
    <WalletContext.Provider value={walletObject}>
      {children}
    </WalletContext.Provider>
  );
}

export default WalletProvider;

export const useWalletContext = () => {
  const context = useContext(WalletContext);

  if (!context) {
    throw new Error("useWallet must be used within WalletProvider");
  }

  return context;
};
