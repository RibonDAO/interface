import offersApi from "services/api/offersApi";
import Offer from "types/entities/Offer";
import { Currencies } from "types/enums/Currencies";
import { useApi } from "../../useApi";

function useOffers(currency: Currencies, subscription = false) {
  const {
    data: offers,
    isLoading,
    refetch,
  } = useApi<Offer[]>({
    key: "offers",
    fetchMethod: () => offersApi.getOffers(currency, subscription),
  });

  return {
    offers,
    isLoading,
    refetch,
  };
}

export default useOffers;
