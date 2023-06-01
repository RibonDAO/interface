import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract } from "utils/contractUtils";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { logError } from "services/crashReport";
import { useWalletContext } from "contexts/walletContext";
import { decryptString } from "utils/encryption";
import { Chain } from "@ribon.io/shared";

type Props = {
  address?: string;
  ABI: any;
  currentNetwork?: Chain;
};

export function useContract<T extends Contract = Contract>({
  address,
  ABI,
  currentNetwork,
}: Props): T | null {
  const { wallet } = useWalletContext();
  return useMemo(() => {
    if (!address || !ABI) return null;
    try {
      const { ethereum } = window;
      if (ethereum && wallet) {
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        return getContract(address, ABI, signer);
      }

      const decryptedNodeUrl = decryptString(
        currentNetwork?.nodeUrl,
        process.env.REACT_APP_NODE_URL_KEY,
        process.env.REACT_APP_NODE_URL_IV,
      );
      const provider = new JsonRpcProvider(decryptedNodeUrl);

      return getContract(address, ABI, provider);
    } catch (error) {
      logError(error);
      return null;
    }
  }, [address, ABI, wallet, currentNetwork]) as T;
}
