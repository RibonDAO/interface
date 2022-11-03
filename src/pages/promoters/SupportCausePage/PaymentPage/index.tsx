import ArrowLeft from "assets/icons/arrow-left-green.svg";
import useNavigation from "hooks/useNavigation";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Offer from "types/entities/Offer";
import Cause from "types/entities/Cause";
import useCardGivingFees from "hooks/apiHooks/useCardGivingFees";
import { Currencies } from "types/enums/Currencies";
import { useState } from "react";
import * as S from "./styles";
import UserInfoSection from "./UserInfoSection";
import CardInfoSection from "./CardInfoSection";

type LocationState = {
  offer: Offer;
  cause: Cause;
};

function PaymentPage(): JSX.Element {
  const { navigateBack } = useNavigation();
  const { state } = useLocation<LocationState>();
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportWithCommunityPage.paymentPage",
  });
  const [currentSection, setCurrentSection] = useState<"user" | "card">("user");
  const { cardGivingFees } = useCardGivingFees(
    state.offer.priceValue,
    state.offer.currency.toUpperCase() as Currencies,
  );

  const renderCurrentSection = () => {
    if (currentSection === "user") return <UserInfoSection />;

    return <CardInfoSection />;
  };

  const handleContinueClick = () => {
    if (currentSection === "user") {
      setCurrentSection("card");
    } else if (currentSection === "card") {
      console.log("send contribution");
    }
  };

  const handleBackButtonClick = () => {
    if (currentSection === "card") {
      setCurrentSection("user");
    } else {
      navigateBack();
    }
  };

  return (
    <S.Container>
      <S.MainContainer>
        <S.BackArrowButton src={ArrowLeft} onClick={handleBackButtonClick} />
        <S.Title>
          {t("title")} <S.TitleHighlight>{state.cause.name}</S.TitleHighlight>
        </S.Title>
        <S.DonationValueText>{state.offer.price}</S.DonationValueText>
        {cardGivingFees && <p>{cardGivingFees.netGiving}</p>}
        {cardGivingFees && <p>{cardGivingFees.serviceFees}</p>}
        {renderCurrentSection()}
        <S.DonateButton text={t("button")} onClick={handleContinueClick} />
      </S.MainContainer>
    </S.Container>
  );
}

export default PaymentPage;
