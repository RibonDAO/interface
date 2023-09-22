import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { Offer } from "@ribon.io/shared/types";

function useCheckoutNavigation() {
  const integrationId = useIntegrationId();
  const { navigateTo } = useNavigation();

  const navigateToCheckout = (
    target: "non_profit" | "cause",
    targetId: number,
    offer: Offer,
    subscription: boolean,
  ) => {
    const searchParams = new URLSearchParams({
      integration_id: integrationId?.toString() || "",
      offer: offer?.priceCents.toString() ?? "1000",
      target,
      target_id: targetId.toString(),
      currency: offer.currency,
      subscription: subscription ? "true" : "false",
    });

    navigateTo({
      pathname: "/promoters/recurrence",
      search: searchParams.toString(),
    });
  };

  return {
    navigateToCheckout,
  };
}

export default useCheckoutNavigation;
