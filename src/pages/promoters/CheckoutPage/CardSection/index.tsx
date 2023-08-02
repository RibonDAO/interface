import usePaymentParams from "hooks/usePaymentParams";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { PLATFORM } from "utils/constants";
import { logEvent } from "lib/events";
import { Offer } from "@ribon.io/shared/types";
import CreditCardForm from "../Components/CreditCardForm";

type Props = {
  currentOffer?: Offer;
};
export default function CardSection({ currentOffer }: Props) {
  const { target, targetId } = usePaymentParams();

  const { handleSubmit } = useCardPaymentInformation();

  const handlePayment = () => {
    if (!currentOffer) return;
    if (targetId)
      logEvent("confirmPaymentFormBtn_click", {
        [target === "cause" ? "causeId" : "nonProfitId"]: targetId,
        currency: currentOffer.currency,
        amount: currentOffer.priceValue,
      });

    handleSubmit(PLATFORM);
  };

  return (
    <CreditCardForm
      onSubmit={handlePayment}
      showFiscalFields={currentOffer?.gateway === "stripe"}
    />
  );
}
