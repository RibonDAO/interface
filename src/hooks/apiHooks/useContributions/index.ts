import { emptyRequest } from "@ribon.io/shared/services";
import { useApi } from "hooks/useApi";
import { Contribution } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import contributionsApi from "services/api/contributionApi";

function useContributions() {
  const { currentUser } = useCurrentUser();

  function useContributionStats(contributionId: number) {
    const { data, error, isLoading, refetch } = useApi<Contribution>({
      key: `useContributionStats-${contributionId}`,
      fetchMethod: () => {
        if (!currentUser?.id && !contributionId) return emptyRequest();

        return contributionsApi.getContributionStats(
          currentUser?.id as number,
          contributionId
        );
      },
    });

    return {
      data,
      error,
      isLoading,
      refetch,
    };
  }
  return { useContributionStats };
}

export default useContributions;
