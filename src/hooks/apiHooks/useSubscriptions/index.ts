import { emptyRequest } from "@ribon.io/shared/services";
import { useApi } from "hooks/useApi";
// import { Subscription } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import subscriptionsApi from "services/api/subscriptionsApi";
import Subscription from "types/entities/Subscription";

function useSubscriptions() {
  const { currentUser } = useCurrentUser();

  function useUserSubscriptions() {
    const { data, error, isLoading, refetch } = useApi<Subscription[]>({
      key: `useSubscriptions-${currentUser?.id}`,
      fetchMethod: () => {
        if (!currentUser?.id) return emptyRequest();

        return subscriptionsApi.getUserSubscriptions(currentUser?.id);
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
    useUserSubscriptions,
  };
}

export default useSubscriptions;
