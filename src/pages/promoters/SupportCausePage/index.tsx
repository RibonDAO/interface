import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "services/analytics";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import Offer from "types/entities/Offer";
import offerFactory from "config/testUtils/factories/offerFactory";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import * as S from "./styles";
import UserSupportSection from "../SupportTreasurePage/CardSection/UserSupportSection";
import SupportImage from "./assets/support-image.png";
import SelectOfferSection from "./SelectOfferSection";

function SupportCausePage(): JSX.Element {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState(0);
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId } = useCardPaymentInformation();

  const { causes } = useCauses();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  useEffect(() => {
    setCause(causes[0]);
  }, [JSON.stringify(causes)]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    logEvent("treasureCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
    setSelectedButtonIndex(index);
  };

  function renderCausesButtons() {
    return causes?.map((item, index) => (
      <S.Button
        outline={index !== selectedButtonIndex}
        onClick={() => handleCauseClick(item, index)}
        key={item?.id}
      >
        <S.ButtonText>{item.name}</S.ButtonText>
      </S.Button>
    ));
  }

  const handleDonateClick = () => {
    logEvent("treasureComCicleBtn_click");
    navigateTo({
      pathname: "/promoters/support-cause/payment",
      state: {
        offer: currentOffer,
        cause,
      },
    });
  };

  const handleCommunityAddClick = () => {
    navigateTo({
      pathname: "/promoters/community-add",
      state: {
        donationAmount: currentOffer.price,
      },
    });
  };

  const communityAddText = () => {
    const PERCENTAGE_OF_INCREASE = 0.6;

    return `+ ${formatPrice(
      currentOffer.priceValue * PERCENTAGE_OF_INCREASE,
      currentOffer.currency,
    )}`;
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.CausesContainer>{renderCausesButtons()}</S.CausesContainer>
      <S.ContentContainer>
        <S.SupportImage src={SupportImage} />
        <S.DonateContainer>
          <S.GivingContainer>
            <S.ContributionContainer>
              <SelectOfferSection
                cause={cause}
                onOfferChange={handleOfferChange}
              />
            </S.ContributionContainer>
            <S.CommunityAddContainer>
              <S.CommunityAddText>{t("communityAddText")}</S.CommunityAddText>
              <S.CommunityAddValue>{communityAddText()}</S.CommunityAddValue>
              <S.CommunityAddButton
                text={t("communityAddButtonText")}
                onClick={handleCommunityAddClick}
                outline
              />
            </S.CommunityAddContainer>
          </S.GivingContainer>
          <S.DonateButton
            text={t("donateButtonText", {
              value: removeInsignificantZeros(currentOffer.price),
            })}
            onClick={handleDonateClick}
          />
        </S.DonateContainer>
        <UserSupportSection />
      </S.ContentContainer>

      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportCausePage;
