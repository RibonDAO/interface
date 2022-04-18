import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { ALCHEMY_URL, getContract } from "utils/contractUtils";
import { Web3Provider, JsonRpcProvider } from "@ethersproject/providers";
import { logError } from "services/crashReport";
import { useWalletContext } from "contexts/walletContext";

type Props = {
  address: string;
  ABI: any;
};

export function useContract<T extends Contract = Contract>({
  address,
  ABI,
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

      const provider = new JsonRpcProvider(ALCHEMY_URL);

      return getContract(address, ABI, provider);
    } catch (error) {
      logError(error);
      return null;
    }
  }, [address, ABI, wallet]) as T;
}
