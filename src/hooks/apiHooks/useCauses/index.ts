import causesApi from "services/api/causesApi";
import Cause from "types/entities/Cause";
import { useApi } from "../../useApi";

function useCauses() {
  const {
    data: causes,
    isLoading,
    refetch,
  } = useApi<Cause[]>({
    key: "causes",
    fetchMethod: () => causesApi.getCauses(),
  });

  async function showCause(causeId: number) {
    const { data: cause } = await causesApi.showCause(causeId);

    return cause;
  }

  return {
    causes: causes || [],
    showCause,
    isLoading,
    refetch,
  };
}

export default useCauses;
