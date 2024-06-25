import { logError } from "services/crashReport";

export async function checkConnectionRequest(): Promise<string | null> {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      return null;
    }

    const accounts = await ethereum.request({ method: "eth_accounts" });

    if (accounts.length !== 0) {
      const account = accounts[0];
      return account;
    }
  } catch (error) {
    logError(error);
  }

  return null;
}

type ConnectWalletRequestProps = {
  onEthereumNotFound?: () => void;
  onError?: () => void;
  onUserRejectedConnection?: () => void;
};
export const USER_REJECTED_CONNECTION_ERROR_CODE = 4001;

export async function connectWalletRequest({
  onEthereumNotFound,
  onError,
  onUserRejectedConnection,
}: ConnectWalletRequestProps): Promise<string | null> {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      if (onEthereumNotFound) onEthereumNotFound();
      return null;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error: any) {
    if (error.code === USER_REJECTED_CONNECTION_ERROR_CODE) {
      if (onUserRejectedConnection) onUserRejectedConnection();
    } else if (onError) onError();
  }

  return null;
}

export async function getChain(handleChainChanged?: (chainId: string) => void) {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      return null;
    }

    const chainId = await ethereum.request({ method: "eth_chainId" });
    if (handleChainChanged) {
      handleChainChanged(chainId);
      ethereum.on("chainChanged", handleChainChanged);
    }

    return chainId;
  } catch (error) {
    logError(error);
  }
  return null;
}

export function onAccountChange(callback: (accounts: string[]) => void) {
  try {
    const { ethereum } = window;

    if (!ethereum) return;

    ethereum.on("accountsChanged", callback);
  } catch (error) {
    logError(error);
  }
}
