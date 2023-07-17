import usePaymentParams from "hooks/usePaymentParams";
import { Currencies } from "@ribon.io/shared/types";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";
import Header from "./Components/Header";
import * as S from "./styles";

function CheckoutPage(): JSX.Element {
  const { currency } = usePaymentParams();

  return (
    <S.Container>
      <Header />
      {currency === Currencies.USDC ? <CryptoSection /> : <CardSection />}
    </S.Container>
  );
}

export default CheckoutPage;
