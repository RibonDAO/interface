import impactApi from "services/api/impactApi";
import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "hooks/useApi";
import Impact from "types/entities/Impact";

function useImpact() {
  const { currentUser } = useCurrentUser();
  const { data: userImpact } = useApi<Impact[]>({
    key: "impacts",
    fetchMethod: () => {
      const id = currentUser?.id || null;
      return impactApi.getImpact(id);
    },
  });

  return {
    userImpact,
  };
}

export default useImpact;
