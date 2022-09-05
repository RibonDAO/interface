import { useApi } from "hooks/useApi";
import { Currencies } from "types/enums/Currencies";
import nonProfitImpactApi from "services/api/nonProfitImpactApi";
import NonProfitImpact from "types/apiResponses/NonProfitImpact";
import { emptyRequest } from "services/api";

function useNonProfitImpact(
  nonProfitId?: number,
  value?: number,
  currency?: Currencies,
) {
  const {
    data: nonProfitImpact,
    isLoading,
    refetch,
  } = useApi<NonProfitImpact>({
    key: `nonProfitImpact${nonProfitId}`,
    fetchMethod: () => {
      if (nonProfitId && value && currency)
        return nonProfitImpactApi.postImpactByNonProfit(
          nonProfitId,
          value,
          currency,
        );

      return emptyRequest();
    },
    options: {
      enabled: !!nonProfitId && !!value && !!currency,
    },
  });

  return { nonProfitImpact, isLoading, refetch };
}

export default useNonProfitImpact;
