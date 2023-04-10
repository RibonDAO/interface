import Divider from "components/atomics/Divider";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import { useTranslation } from "react-i18next";
import theme from "styles/theme";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { Offer } from "@ribon.io/shared/types";
import { useEffect } from "react";
import BillingInformationSection from "./BillingInformationSection";
import FeesSection from "../FeesSection";
import * as S from "./styles";

type LocationState = {
  currentOffer: Offer;
};

function BillingInformationPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix:
      "promoters.supportTreasurePage.cardSection.billingInformationPage",
  });
  const { neutral } = theme.colors;
  const { navigateTo } = useNavigation();
  const {
    state: { currentOffer },
  } = useLocation<LocationState>();

  const { currentCoin, buttonDisabled, setCryptoGiving, setOfferId } =
    useCardPaymentInformation();

  useEffect(() => {
    setOfferId(currentOffer.id);
  }, [currentOffer]);

  const givingValue = () => currentOffer.priceValue;
  const givingTotal = () => currentOffer.price;

  function handleClickNext() {
    logEvent("treasureSupportNextStepBtn_click", { from: "billingInfo" });
    navigateTo({
      pathname: "/promoters/support-treasure/payment-information",
      state: {
        currentOffer,
      },
    });
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
      <Divider color={neutral[200]} />

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
