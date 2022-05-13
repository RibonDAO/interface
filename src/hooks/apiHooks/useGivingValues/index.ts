import { useApi } from "hooks/useApi";
import givingValuesApi from "services/api/givingValuesApi";
import GivingValue from "types/entities/GivingValue";

function useGivingValues(coin: "usd" | "brl") {
  const {
    data: givingValues,
    isLoading,
    refetch,
  } = useApi<GivingValue[]>({
    key: "givingValues",
    fetchMethod: () => givingValuesApi.getGivingValues(coin),
  });

  return { givingValues, isLoading, refetch };
}

export default useGivingValues;
