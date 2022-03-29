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

  const checkIfWalletIsConnected = useCallback(async () => {
    const checkConnectionRequestResponse = await checkConnectionRequest();
    setWallet(checkConnectionRequestResponse);
  }, []);

  useEffect(() => {
    checkIfWalletIsConnected();
  }, [checkIfWalletIsConnected]);

  const connectWallet = useCallback(async () => {
    const connectWalletResponse = await connectWalletRequest();
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
