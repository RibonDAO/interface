import { useApi } from "hooks/useApi";
import { Currencies } from "types/enums/Currencies";
import CardFees from "types/apiResponses/CardFees";
import givingFeesApi from "services/api/givingFeesApi";

function useCardGivingFees(value: number, currency: Currencies) {
  const {
    data: cardGivingFees,
    isLoading,
    refetch,
  } = useApi<CardFees>({
    key: "cardGivingFees",
    fetchMethod: () => givingFeesApi.postCardFees(value, currency),
    options: {
      enabled: value > 0,
    },
  });

  return { cardGivingFees, isLoading, refetch };
}

export default useCardGivingFees;
