import { useApi } from "hooks/useApi";
import givingValuesApi from "services/api/givingValuesApi";
import GivingValue from "types/entities/GivingValue";
import { Currencies } from "types/enums/Currencies";

function useGivingValues(coin: Currencies) {
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
