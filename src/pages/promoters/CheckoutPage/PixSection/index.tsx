import { useStripe } from "contexts/stripeContext";
import PixForm from "pages/promoters/CheckoutPage/Components/PixForm";
import { usePixPaymentInformation } from "contexts/pixPaymentInformationContext";

export default function PixSection() {
  const { stripe } = useStripe();
  const { handleSubmit } = usePixPaymentInformation();

  const handlePixButtonClick = () => {
    handleSubmit();
  };

  if (!stripe) return null;

  return (
    <div>
      <PixForm onSubmit={handlePixButtonClick} showFiscalFields />
    </div>
  );
}
