import usePaymentParams from "hooks/usePaymentParams";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";
import Header from "./Components/Header";
import * as S from "./styles";

function CheckoutPage(): JSX.Element {
  const { currency } = usePaymentParams();

  return (
    <S.Container>
      <Header />
      {currency === "USDC" ? <CryptoSection /> : <CardSection />}
    </S.Container>
  );
}

export default CheckoutPage;
