import { useStripe } from "contexts/stripeContext";
import PixForm from "pages/promoters/CheckoutPage/Components/PixForm";
import { usePixPaymentInformation } from "contexts/pixPaymentInformationContext";
import { logEvent } from "lib/events";
import usePaymentParams from "hooks/usePaymentParams";
import { Offer } from "@ribon.io/shared/types";
import { useExperiment } from "@growthbook/growthbook-react";

type Props = {
  currentOffer?: Offer;
};

export default function PixSection({ currentOffer }: Props) {
  const { stripe } = useStripe();
  const { handleSubmit } = usePixPaymentInformation();
  const { target, targetId } = usePaymentParams();

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  const handlePixButtonClick = () => {
    if (!currentOffer) return;
    if (targetId)
      logEvent("confirmPaymentFormBtn_click", {
        target: target ?? "",
        targetId,
        currency: currentOffer.currency,
        amount: currentOffer.priceValue,
        paymentMethod: "pix",
        variation: variation.value,
      });

    handleSubmit();
  };

  if (!stripe) return null;

  return (
    <div>
      <PixForm onSubmit={handlePixButtonClick} showFiscalFields />
    </div>
  );
}
