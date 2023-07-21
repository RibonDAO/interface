import usePaymentParams from "hooks/usePaymentParams";
import { Currencies } from "@ribon.io/shared/types";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";
import Header from "./Components/Header";
import * as S from "./styles";

function CheckoutPage(): JSX.Element {
  const { currency } = usePaymentParams();

  useEffect(() => {
    // this is not being logged on logPageView because it would log everytime a param changes
    // (like currency, offer, etc)
    logEvent("P23_view");
  }, []);

  return (
    <S.Container>
      <Header />
      {currency === Currencies.USDC ? <CryptoSection /> : <CardSection />}
    </S.Container>
  );
}

export default CheckoutPage;
