import { logError } from "services/crashReport";
import { permittedChainIds } from "../../config/chains/permittedChains";

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

export async function connectWalletRequest(): Promise<string | null> {
  try {
    const { ethereum } = window;

    if (!ethereum) {
      return null;
    }

    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    return accounts[0];
  } catch (error) {
    logError(error);
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

export function validChain(chainId: string) {
  return permittedChainIds.includes(chainId);
}

export function onAccountChange(callback: (accounts: string[]) => void) {
  try {
    const { ethereum } = window;

    if (!ethereum) return;

    ethereum.on("accountsChanged", (accounts: string[]) => {
      callback(accounts);
    });
  } catch (error) {
    logError(error);
  }
}
