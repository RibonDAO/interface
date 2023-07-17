import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { NonProfit, Offer, Cause, Currencies } from "@ribon.io/shared/types";
import { useCardGivingFees } from "@ribon.io/shared/hooks";
import { useEffect, useState } from "react";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import getThemeByFlow from "lib/themeByFlow";
import { logEvent } from "lib/events";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import * as S from "./styles";
import UserInfoSection from "./UserInfoSection";
import CardInfoSection from "./CardInfoSection";

type LocationState = {
  offer: Offer;
  cause: Cause;
  nonProfit?: NonProfit;
  flow: "cause" | "nonProfit";
  platform: string;
};

function PaymentPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const {
    state: { offer, cause, nonProfit, flow, platform },
  } = useLocation<LocationState>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportWithCommunityPage.paymentPage",
  });
  const [currentSection, setCurrentSection] = useState<"user" | "card">("user");
  const { cardGivingFees } = useCardGivingFees(
    offer.priceValue ?? 0,
    offer.currency.toUpperCase() as Currencies,
  );
  const { buttonDisabled, handleSubmit, setCause, setNonProfit, setOfferId } =
    useCardPaymentInformation();
  const { hideBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const colorTheme = getThemeByFlow(flow);

  useEffect(() => {
    hideBlockedDonationContributionModal();
  }, []);

  useEffect(() => {
    setCause(cause);
  }, [cause]);

  useEffect(() => {
    setNonProfit(nonProfit);
  }, [nonProfit]);

  useEffect(() => {
    setOfferId(offer.id);
  }, [offer]);

  useEffect(() => {
    if (flow === "cause") {
      logEvent("P5_view", {
        causeId: cause?.id,
        price: offer.priceValue,
        currency: offer.currency,
        platform: "web",
      });
    }
    if (flow === "nonProfit") {
      logEvent("P6_view", {
        nonprofitId: nonProfit?.id,
        price: offer.priceValue,
        currency: offer.currency,
        platform: "web",
      });
    }
  }, []);

  const isUserSection = () => currentSection === "user";
  const isCardSection = () => currentSection === "card";

  const renderCurrentSection = () => {
    if (isUserSection()) return <UserInfoSection />;

    return <CardInfoSection />;
  };

  const handleContinueClick = () => {
    if (isUserSection()) {
      setCurrentSection("card");
    } else if (isCardSection()) {
      handleSubmit(platform);
    }
  };

  const handleBackButtonClick = () => {
    if (isCardSection()) {
      setCurrentSection("user");
    } else {
      navigateBack();
    }
  };

  const isNonprofit = () => flow === "nonProfit" && nonProfit;
  const highlightText = () => (isNonprofit() ? nonProfit?.name : cause?.name);

  return (
    <S.Container>
      <S.BackArrowButton
        src={ArrowLeft}
        onClick={handleBackButtonClick}
        alt="back-arrow-button"
      />
      <S.MainContainer>
        <S.SupportImage
          src={isNonprofit() ? nonProfit?.backgroundImage : cause?.coverImage}
          alt={
            (isNonprofit()
              ? nonProfit?.backgroundImageDescription
              : cause?.coverImageDescription) ?? ""
          }
        />
        <S.ContentContainer>
          <S.Title>
            {t("title")}{" "}
            <S.TitleHighlight color={colorTheme.shade30}>
              {highlightText()}
            </S.TitleHighlight>
          </S.Title>
          <S.DonationValueText color={colorTheme.shade20}>
            {offer.price}
          </S.DonationValueText>
          {cardGivingFees && (
            <S.FeeText>
              {t("netDonationText")} {cardGivingFees.netGiving}
            </S.FeeText>
          )}
          {cardGivingFees && (
            <S.FeeText>
              {t("serviceFeesText")} {cardGivingFees.serviceFees}
            </S.FeeText>
          )}
          {renderCurrentSection()}
        </S.ContentContainer>
        <S.DonateButtonContainer>
          <S.DonateButton
            text={t("button")}
            onClick={handleContinueClick}
            disabled={buttonDisabled}
            colorTheme={colorTheme}
          />
        </S.DonateButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default PaymentPage;
