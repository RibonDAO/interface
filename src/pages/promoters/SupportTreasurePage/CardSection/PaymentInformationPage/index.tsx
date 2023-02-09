import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { logEvent } from "lib/events";
import Offer from "types/entities/Offer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import PaymentInformationSection from "./PaymentInformationSection";
import FeesSection from "../FeesSection";
import * as S from "./styles";

type LocationState = {
  currentOffer: Offer;
};

function PaymentInformationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.paymentInformationPage",
  });
  const { neutral } = theme.colors;
  const {
    currentCoin,
    buttonDisabled,
    setCryptoGiving,
    handleSubmit,
    setOfferId,
  } = useCardPaymentInformation();
  const {
    state: { currentOffer },
  } = useLocation<LocationState>();

  useEffect(() => {
    setOfferId(currentOffer.id);
  }, [currentOffer]);

  function handleClickNext() {
    logEvent("treasureSupportNextStepBtn_click", { from: "billingInfo" });
    handleSubmit();
  }

  const givingValue = () => currentOffer.priceValue;
  const givingTotal = () => currentOffer.price;

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <FeesSection
        currency={currentCoin}
        givingValue={givingValue()}
        givingTotal={givingTotal()}
        setCryptoGiving={setCryptoGiving}
      />
      <Divider color={neutral[200]} />

      <PaymentInformationSection />

      <S.ButtonContainer>
        <S.FinishButton
          text={t("buttonTextCard")}
          onClick={() => {
            handleClickNext();
          }}
          disabled={buttonDisabled}
        />
      </S.ButtonContainer>
    </S.Container>
  );
}

export default PaymentInformationPage;
