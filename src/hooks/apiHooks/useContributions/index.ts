import { emptyRequest } from "@ribon.io/shared/services";
import { useApi } from "hooks/useApi";
import { Contribution } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import contributionsApi from "services/api/contributionApi";

function useContributions() {
  const { currentUser } = useCurrentUser();

  function useLabelableContributions() {
    const { data, error, isLoading, refetch } = useApi<Contribution[]>({
      key: `useLabelableContributions-${currentUser?.id}`,
      fetchMethod: () => {
        if (!currentUser?.id) return emptyRequest();

        return contributionsApi.getLabelableContributions(currentUser?.id);
      },
    });

    return {
      data,
      error,
      isLoading,
      refetch,
    };
  }
  function useUserContributions() {
    const { data, error, isLoading, refetch } = useApi<Contribution[]>({
      key: `useUserContributions-${currentUser?.id}`,
      fetchMethod: () => {
        if (!currentUser?.id) return emptyRequest();

        return contributionsApi.getContributions(currentUser?.id);
      },
    });

    return {
      data,
      error,
      isLoading,
      refetch,
    };
  }

  function useContributionStats(contributionId: number) {
    const { data, error, isLoading, refetch } = useApi<Contribution>({
      key: `useContributionStats-${contributionId}`,
      fetchMethod: () => {
        if (!currentUser?.id && !contributionId) return emptyRequest();

        return contributionsApi.getContributionStats(
          currentUser?.id as number,
          contributionId,
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
  return {
    useUserContributions,
    useContributionStats,
    useLabelableContributions,
  };
}

export default useContributions;
