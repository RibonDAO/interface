import personPaymentsApi from "services/api/personPaymentsApi";
import { useApi } from "hooks/useApi";
import { PersonPayment } from "types/entities/PersonPayment";
import { useCurrentUser } from "contexts/currentUserContext";
import { emptyRequest } from "services/api";

function usePersonPayments() {
  const { currentUser } = useCurrentUser();
  const { data: personPayments, isLoading } = useApi<PersonPayment[]>({
    key: "personPayments",
    fetchMethod: () => {
      if (!currentUser?.id) return emptyRequest();
      return personPaymentsApi.getCommunityPersonPayments(
        btoa(currentUser?.email),
      );
    },
  });

  return {
    personPayments,
    isLoading,
  };
}

export default usePersonPayments;
