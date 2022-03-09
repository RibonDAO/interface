import { useApi } from "hooks/useApi";
import integrationsApi from "services/api/integrationsApi";
import Integration from "types/entities/Integration";

function useIntegration(integrationId: number) {
  const {
    data: integration,
    isLoading,
    refetch,
  } = useApi<Integration>({
    key: "integration",
    fetchMethod: () => integrationsApi.getIntegration(integrationId),
  });

  return { integration, isLoading, refetch };
}

export default useIntegration;
