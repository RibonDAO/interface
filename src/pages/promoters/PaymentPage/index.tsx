import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Offer from "types/entities/Offer";
import Cause from "types/entities/Cause";
import useCardGivingFees from "hooks/apiHooks/useCardGivingFees";
import { Currencies } from "types/enums/Currencies";
import { useEffect, useState } from "react";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import NonProfit from "types/entities/NonProfit";
import * as S from "./styles";
import UserInfoSection from "./UserInfoSection";
import CardInfoSection from "./CardInfoSection";
import SupportImage from "../../../assets/images/support-image.png";

type LocationState = {
  offer: Offer;
  cause: Cause;
  nonProfit: NonProfit;
};

function PaymentPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const {
    state: { offer, cause, nonProfit },
  } = useLocation<LocationState>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportWithCommunityPage.paymentPage",
  });
  const [currentSection, setCurrentSection] = useState<"user" | "card">("user");
  const { cardGivingFees } = useCardGivingFees(
    offer.priceValue,
    offer.currency.toUpperCase() as Currencies,
  );
  const { buttonDisabled, handleSubmit, setCause, setNonProfit } =
    useCardPaymentInformation();

  useEffect(() => {
    setCause(cause);
  }, [cause]);

  useEffect(() => {
    setNonProfit(nonProfit);
  }, [nonProfit]);

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
      handleSubmit();
    }
  };

  const handleBackButtonClick = () => {
    if (isCardSection()) {
      setCurrentSection("user");
    } else {
      navigateBack();
    }
  };

  const highlightText = () => nonProfit?.name || cause?.name;

  return (
    <S.Container>
      <S.BackArrowButton
        src={ArrowLeft}
        onClick={handleBackButtonClick}
        alt="back-arrow-button"
      />
      <S.MainContainer>
        <S.SupportImage
          src={nonProfit?.mainImage || SupportImage}
          alt="support-cause-img"
        />
        <S.ContentContainer>
          <S.Title>
            {t("title")} <S.TitleHighlight>{highlightText()}</S.TitleHighlight>
          </S.Title>
          <S.DonationValueText>{offer.price}</S.DonationValueText>
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
          />
        </S.DonateButtonContainer>
      </S.MainContainer>
    </S.Container>
  );
}

export default PaymentPage;
