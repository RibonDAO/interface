import { useStripe } from "contexts/stripeContext";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { logError } from "services/crashReport";

const LAST_CLIENT_SECRET_KEY = "LAST_CLIENT_SECRET_KEY";
export default function PixSection() {
  const [clientSecret, setClientSecret] = useState<string>(
    getLocalStorageItem(LAST_CLIENT_SECRET_KEY) || "",
  );
  const [loading, setLoading] = useState<boolean>(false);
  const { stripe } = useStripe();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  const confirmPixPayment = async () => {
    setLoading(true);
    try {
      const response = await stripe?.confirmPixPayment(clientSecret);
      console.log(response?.paymentIntent?.status, response?.paymentIntent);
    } catch (e) {
      logError(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (clientSecret) {
      setLocalStorageItem(LAST_CLIENT_SECRET_KEY, clientSecret);
      confirmPixPayment();
    }
  }, [clientSecret]);

  const handlePixButtonClick = () => {
    // request to get client secret
    const fakeClientSecret =
      "pi_3NafdBJuOnwQq9Qx1mYHEFEq_secret_ahjTGMrKzKeh1uhvAuoOdl0eJ";
    setClientSecret(fakeClientSecret);
  };

  if (!stripe) return null;

  return (
    <div>
      <Button
        text={t("pixButtonText")}
        onClick={handlePixButtonClick}
        disabled={loading}
      />
    </div>
  );
}
