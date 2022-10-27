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

  return {
    causes: causes || [],
    isLoading,
    refetch,
  };
}

export default useCauses;
