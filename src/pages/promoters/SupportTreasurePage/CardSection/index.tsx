import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import theme from "styles/theme";
import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import useOffers from "hooks/apiHooks/useOffers";
import { logEvent } from "services/analytics";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "./FeesSection";
import * as S from "./styles";
import PaymentInformation from "./PaymentInformationSection";
import ImpactInformationSection from "./ImpactInformationSection";

const { lightGray } = theme.colors;

function CardSection(): JSX.Element {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection",
  });

  const {
    currentCoin,
    handleSubmit,
    selectedButtonIndex,
    buttonDisabled,
    setButtonDisabled,
    setCryptoGiving,
    setOfferId,
  } = useCardPaymentInformation();

  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  const givingValue = useCallback(() => {
    if (offers) return offers[selectedButtonIndex]?.priceValue;

    return 0;
  }, [selectedButtonIndex, offers, currentCoin]);

  const givingTotal = useCallback(() => {
    if (!offers) return "";

    return offers[selectedButtonIndex]?.price;
  }, [offers, selectedButtonIndex, currentCoin]);

  const sections = [
    <ImpactInformationSection />,
    <BillingInformationSection />,
    <PaymentInformation />,
  ];

  function handleClickNext() {
    setButtonDisabled(true);
    if (currentSectionIndex < sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
      setOfferId(offers?.[selectedButtonIndex]?.id ?? 0);
      logEvent("treasureSupportNextStepBtn_click");
    } else {
      handleSubmit();
    }
  }

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  return (
    <>
      <S.CardSectionContainer>
        {givingValue() > 0 && currentSectionIndex > 0 && (
          <>
            <FeesSection
              currency={currentCoin}
              givingValue={givingValue()}
              givingTotal={givingTotal()}
              setCryptoGiving={setCryptoGiving}
            />
            <Divider color={lightGray} />
          </>
        )}
        {sections[currentSectionIndex]}
      </S.CardSectionContainer>
      <S.ButtonContainer>
        <S.FinishButton
          text={
            currentSectionIndex < sections.length - 1
              ? t("buttonTextCard")
              : t("buttonSubmit")
          }
          onClick={() => {
            handleClickNext();
          }}
          disabled={buttonDisabled}
        />
      </S.ButtonContainer>
    </>
  );
}

export default CardSection;
