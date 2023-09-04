import usePaymentParams from "hooks/usePaymentParams";
import { Currencies } from "@ribon.io/shared/types";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import FiatSection from "pages/promoters/CheckoutPage/FiatSection";
import { useExperiment } from "@growthbook/growthbook-react";
import CryptoSection from "./CryptoSection";
import Header from "./Components/Header";
import * as S from "./styles";

function CheckoutPage(): JSX.Element {
  const { currency, target, targetId, offer } = usePaymentParams();

  const variation = useExperiment({
    key: "understanding-test",
    variations: ["control", "product", "growth"],
  });

  useEffect(() => {
    // this is not being logged on logPageView because it would log everytime a param changes
    // (like currency, offer, etc)
    logEvent("P23_view", {
      currency: currency ?? "",
      target: target ?? "",
      targetId: targetId ?? "",
      offer: offer ?? "",
      variation: variation.value,
    });
  }, [currency, target, targetId, offer]);

  return (
    <S.Container>
      <Header />
      {currency === Currencies.USDC ? <CryptoSection /> : <FiatSection />}
    </S.Container>
  );
}

export default CheckoutPage;
