import { useApi } from "hooks/useApi";
import usersApi from "services/api/usersApi";
import { emptyRequest } from "services/api";
import FirstAccessToIntegration from "types/apiResponses/FirstAccessToIntegration";

function useFirstAccessToIntegration(integrationId: number | string | null) {
  const {
    data: firstAccessToIntegration,
    isLoading,
    refetch,
  } = useApi<FirstAccessToIntegration>({
    key: "first_access_to_integration",
    fetchMethod: () => {
      if (integrationId)
        return usersApi.getFirstAccessToIntegration(integrationId);

      return emptyRequest();
    },
    options: {
      enabled: !!integrationId,
    },
    criteria: [integrationId],
  });

  function formattedIsFirstAccessToIntegration() {
    return firstAccessToIntegration?.firstAccessToIntegration;
  }

  return {
    isFirstAccessToIntegration: formattedIsFirstAccessToIntegration(),
    isLoading,
    refetch,
  };
}

export default useFirstAccessToIntegration;
