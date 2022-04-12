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
import { logEvent } from "services/analytics";

export interface IWalletContext {
  wallet: string | null;
  checkIfWalletIsConnected: () => void;
  connectWallet: () => void;
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
  const { t } = useTranslation("translation", {
    keyPrefix: "contexts.walletContext",
  });

  const checkIfWalletIsConnected = useCallback(async () => {
    const checkConnectionRequestResponse = await checkConnectionRequest();
    setWallet(checkConnectionRequestResponse);
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

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
    setWallet(connectWalletResponse);
  }, []);

  const walletObject: IWalletContext = useMemo(
    () => ({
      wallet,
      checkIfWalletIsConnected,
      connectWallet,
      setWallet,
    }),
    [wallet, checkIfWalletIsConnected, connectWallet],
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
