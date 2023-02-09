import personPaymentsApi from "services/api/personPaymentsApi";
import { useApi } from "hooks/useApi";
import { PersonPayment } from "types/entities/PersonPayment";
import { useCurrentUser } from "contexts/currentUserContext";
import { emptyRequest } from "services/api";
import { useWalletContext } from "contexts/walletContext";

function usePersonPayments(page?: number, per?: number) {
  const { currentUser } = useCurrentUser();
  const { wallet } = useWalletContext();

  const { data: userPersonCommunityPayments } = useApi<PersonPayment[]>({
    key: `userPersonCommunityPayments_${page || 0}_${per || 0}`,
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return personPaymentsApi.getCommunityPersonPayments(
        window.btoa(currentUser?.email),
        page || undefined,
        per || undefined,
      );
    },
  });

  const { data: guestPersonCommunityPayments } = useApi<PersonPayment[]>({
    key: `guestPersonCommunityPayments_${page || 0}_${per || 0}`,
    fetchMethod: () => {
      if (!wallet) return emptyRequest();
      return personPaymentsApi.getCommunityPersonPayments(
        window.btoa(wallet.toLowerCase()),
        page || undefined,
        per || undefined,
      );
    },
  });

  const { data: userPersonDirectPayments } = useApi<PersonPayment[]>({
    key: `userPersonDirectPayments_${page || 0}_${per || 0}`,
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return personPaymentsApi.getDirectPersonPayments(
        window.btoa(currentUser?.email),
        page || undefined,
        per || undefined,
      );
    },
  });

  return {
    userPersonCommunityPayments,
    guestPersonCommunityPayments,
    userPersonDirectPayments,
  };
}

export default usePersonPayments;
