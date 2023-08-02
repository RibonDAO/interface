import { useStripe } from "contexts/stripeContext";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";

const LAST_CLIENT_SECRET_KEY = "LAST_CLIENT_SECRET_KEY";
export default function PixSection() {
  const [clientSecret, setClientSecret] = useState<string>(
    getLocalStorageItem(LAST_CLIENT_SECRET_KEY) || "",
  );
  const { stripe } = useStripe();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.checkoutPage",
  });

  useEffect(() => {
    if (clientSecret) setLocalStorageItem(LAST_CLIENT_SECRET_KEY, clientSecret);
  }, [clientSecret]);

  const handlePixButtonClick = () => {
    console.log(clientSecret);
    setClientSecret("client_secret");
  };

  if (!stripe) return null;

  return (
    <div>
      <Button text={t("pixButtonText")} onClick={handlePixButtonClick} />
    </div>
  );
}
