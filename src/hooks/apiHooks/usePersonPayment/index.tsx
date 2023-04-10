import personPaymentsApi from "services/api/personPaymentsApi";
import { useApi } from "hooks/useApi";
import { PersonPayment } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import { emptyRequest } from "@ribon.io/shared/services";
import { useWalletContext } from "contexts/walletContext";

function usePersonPayments() {
  const { currentUser } = useCurrentUser();
  const { wallet } = useWalletContext();

  function useCommunityPersonPayments(page?: number, per?: number) {
    const { data, error, isLoading, refetch } = useApi<PersonPayment[]>({
      key: `useCommunityPersonPayments_${page || 0}_${per || 0}`,
      fetchMethod: () => {
        if (!currentUser?.id && !wallet) return emptyRequest();

        return personPaymentsApi.getCommunityPersonPayments(
          currentUser ? window.btoa(currentUser?.email) : undefined,
          wallet ? window.btoa(wallet.toLowerCase()) : undefined,
          page || undefined,
          per || undefined,
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

  function useDirectPersonPayments(page?: number, per?: number) {
    const { data, error, isLoading, refetch } = useApi<PersonPayment[]>({
      key: `useDirectPersonPayments_${page || 0}_${per || 0}`,
      fetchMethod: () => {
        if (!currentUser?.id && !wallet) return emptyRequest();

        return personPaymentsApi.getDirectPersonPayments(
          currentUser ? window.btoa(currentUser?.email) : undefined,
          wallet ? window.btoa(wallet.toLowerCase()) : undefined,
          page || undefined,
          per || undefined,
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
    useCommunityPersonPayments,
    useDirectPersonPayments,
  };
}

export default usePersonPayments;
