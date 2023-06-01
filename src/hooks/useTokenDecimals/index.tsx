import { useEffect, useState } from "react";
import DonationTokenAbi from "utils/abis/DonationToken.json";
import { useContract } from "hooks/useContract";
import { useNetworkContext } from "contexts/networkContext";
import { logError } from "services/crashReport";

function useTokenDecimals() {
  const [tokenDecimals, setTokenDecimals] = useState<number>();
  const { currentNetwork } = useNetworkContext();

  const donationTokenContract = useContract({
    address: currentNetwork?.donationTokenContractAddress,
    ABI: DonationTokenAbi.abi,
    currentNetwork,
  });

  async function fetchDecimals() {
    try {
      const decimals = await donationTokenContract?.decimals();
      if (decimals) setTokenDecimals(decimals);
    } catch (error) {
      logError(error);
    }
  }

  useEffect(() => {
    fetchDecimals();
  }, [donationTokenContract]);

  return { tokenDecimals };
}

export default useTokenDecimals;
