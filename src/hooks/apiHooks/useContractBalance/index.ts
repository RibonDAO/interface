import { useContractRequest } from "hooks/useContractRequest";
import { Contract } from "@ethersproject/contracts";
import { formatFromDecimals } from "lib/web3Helpers/etherFormatters";
import { useCallback, useEffect, useState } from "react";

function useContractBalance(contract: Contract | null, address?: string) {
  const [contractBalance, setContractBalance] = useState(0);

  const { data, isLoading, refetch } = useContractRequest<number>({
    key: `contractBalance${address}`,
    fetchMethod: () => contract?.balanceOf(address),
  });

  const setFormattedBalance = useCallback(async () => {
    if (data) {
      const decimals = await contract?.decimals();
      setContractBalance(formatFromDecimals(data, decimals));
    }
  }, [data]);

  useEffect(() => {
    setFormattedBalance();
  }, [setFormattedBalance]);

  return { contractBalance, isLoading, refetch };
}

export default useContractBalance;
