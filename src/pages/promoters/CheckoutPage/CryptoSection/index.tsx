import { useLocationSearch } from "hooks/useLocationSearch";
import usePaymentParams from "hooks/usePaymentParams";
import { useEffect } from "react";

export default function CryptoSection() {
  const { target, currency } = usePaymentParams();

  const { updateLocationSearch } = useLocationSearch();

  useEffect(() => {
    if (target === "non_profit" && currency === "USDC") {
      updateLocationSearch("currency", "USD");
    }
  }, [target, currency]);

  return <div>not available yet</div>;
}
