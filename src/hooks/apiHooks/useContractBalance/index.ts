import { useContractRequest } from "hooks/useContractRequest";
import { Contract } from "@ethersproject/contracts";
import { formatFromWei } from "lib/web3Helpers/etherFormatters";

function useContractBalance(contract: Contract | null, address: string) {
  const { data, isLoading, refetch } = useContractRequest<number>({
    key: "contractBalance",
    fetchMethod: () => contract?.balanceOf(address),
  });

  function formattedBalance() {
    if (data) return formatFromWei(data);

    return null;
  }

  return { contractBalance: formattedBalance(), isLoading, refetch };
}

export default useContractBalance;
