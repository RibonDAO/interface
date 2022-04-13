import { Contract } from "@ethersproject/contracts";
import { useMemo } from "react";
import { getContract, RIBON_CONTRACT_ADDRESS } from "utils/contractUtils";
import { Web3Provider } from "@ethersproject/providers";
import { logError } from "services/crashReport";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";

type Props = {
  address: string;
  ABI: any;
};

export function useContract<T extends Contract = Contract>({
  address,
  ABI,
}: Props): T | null {
  return useMemo(() => {
    if (!address || !ABI) return null;
    try {
      const { ethereum } = window;
      if (ethereum) {
        const provider = new Web3Provider(ethereum);
        const signer = provider.getSigner();
        console.log(provider);
        return getContract(address, ABI, signer);
      }

      // const url =
      //     "https://polygon-mumbai.g.alchemy.com/v2/iwJOj0NGGqgpYpyCJxt3dZzu9wOMACg_";
      // https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks
      // const provider = new Web3Provider(
      //   new AlchemyProvider(80001, "iwJOj0NGGqgpYpyCJxt3dZzu9wOMACg") as any,
      // );
      const web3 = createAlchemyWeb3(
        "https://polygon-mumbai.g.alchemy.com/v2/1fEWpdSHuohPveNBGvlozE6qv9P1uAks",
      );

      // console.log(provider);
      const contract = new web3.eth.Contract(ABI, address);
      contract.methods
        .balanceOf(RIBON_CONTRACT_ADDRESS)
        .call()
        .then((e: any) => console.log(web3.utils.fromWei(e)));
      return contract;
      // const signer = provider.getSigner();
      // return getContract(address, ABI, signer);
    } catch (error) {
      console.log(error);
      logError(error);
      return null;
    }
  }, [address, ABI]) as T;
}
