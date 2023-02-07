import personPaymentsApi from "services/api/personPaymentsApi";
import { useApi } from "hooks/useApi";
import { PersonPayment } from "types/entities/PersonPayment";
import { useCurrentUser } from "contexts/currentUserContext";
import { emptyRequest } from "services/api";
import { useWalletContext } from "contexts/walletContext";

function usePersonPayments() {
  const { currentUser } = useCurrentUser();
  const { wallet } = useWalletContext();

  const { data: userPersonCommunityPayments } = useApi<PersonPayment[]>({
    key: "userPersonCommunityPayments",
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return personPaymentsApi.getCommunityPersonPayments(
        btoa(currentUser?.email),
      );
    },
  });

  const { data: guestPersonCommunityPayments } = useApi<PersonPayment[]>({
    key: "guestPersonCommunityPayments",
    fetchMethod: () => {
      if (!wallet) return emptyRequest();
      return personPaymentsApi.getCommunityPersonPayments(
        btoa(wallet.toLowerCase()),
      );
    },
  });

  const { data: userPersonDirectPayments } = useApi<PersonPayment[]>({
    key: "userPersonDirectPayments",
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return personPaymentsApi.getDirectPersonPayments(
        btoa(currentUser?.email),
      );
    },
  });

  const { data: guestPersonDirectPayments } = useApi<PersonPayment[]>({
    key: "guestPersonDirectPayments",
    fetchMethod: () => {
      if (!wallet) return emptyRequest();
      return personPaymentsApi.getDirectPersonPayments(btoa(wallet));
    },
  });

  return {
    userPersonCommunityPayments,
    guestPersonCommunityPayments,
    userPersonDirectPayments,
    guestPersonDirectPayments,
  };
}

export default usePersonPayments;
