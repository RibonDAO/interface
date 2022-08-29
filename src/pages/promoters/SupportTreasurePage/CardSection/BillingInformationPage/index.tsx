import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import useOffers from "hooks/apiHooks/useOffers";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { logEvent } from "services/analytics";
import useNavigation from "hooks/useNavigation";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "../FeesSection";
import * as S from "./styles";

function BillingInformationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.billingInformationPage",
  });
  const { lightGray } = theme.colors;
  const { navigateTo } = useNavigation();

  const { currentCoin, selectedButtonIndex, buttonDisabled, setCryptoGiving } =
    useCardPaymentInformation();

  const { offers } = useOffers(currentCoin, false);

  const givingValue = useCallback(() => {
    if (offers) return offers[selectedButtonIndex]?.priceValue;

    return 0;
  }, [selectedButtonIndex, offers, currentCoin]);

  const givingTotal = useCallback(() => {
    if (!offers) return "";

    return offers[selectedButtonIndex]?.price;
  }, [offers, selectedButtonIndex, currentCoin]);

  function handleClickNext() {
    logEvent("treasureSupportNextStepBtn_click", { from: "billingInfo" });
    navigateTo("/promoters/support-treasure/payment-information");
  }

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <FeesSection
        currency={currentCoin}
        givingValue={givingValue()}
        givingTotal={givingTotal()}
        setCryptoGiving={setCryptoGiving}
      />
      <Divider color={lightGray} />

      <BillingInformationSection />

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

export default BillingInformationPage;
