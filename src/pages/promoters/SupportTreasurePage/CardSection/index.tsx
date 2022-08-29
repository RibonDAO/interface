import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import useOffers from "hooks/apiHooks/useOffers";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import * as S from "./styles";
import ImpactInformationSection from "./ImpactInformationSection";

function CardSection(): JSX.Element {
  const { navigateTo } = useNavigation();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage.cardSection",
  });

  const {
    currentCoin,
    selectedButtonIndex,
    buttonDisabled,
    setButtonDisabled,
    setOfferId,
  } = useCardPaymentInformation();

  const { offers, refetch: refetchOffers } = useOffers(currentCoin, false);

  function handleClickNext() {
    setButtonDisabled(true);
    setOfferId(offers?.[selectedButtonIndex]?.id ?? 0);
    logEvent("treasureSupportNextStepBtn_click");
    navigateTo("/promoters/support-treasure/billing-information");
  }

  useEffect(() => {
    refetchOffers();
  }, [currentCoin]);

  return (
    <>
      <S.CardSectionContainer>
        <ImpactInformationSection />
      </S.CardSectionContainer>
      <S.ButtonContainer>
        <S.FinishButton
          text={t("buttonTextCard")}
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
