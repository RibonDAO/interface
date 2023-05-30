import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import { useCauses } from "@ribon.io/shared/hooks";
import { Cause, Offer } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import offerFactory from "config/testUtils/factories/offerFactory";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import { useLocation } from "react-router-dom";
import Intersection from "assets/images/intersection-image.svg";
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import SelectOfferSection from "./SelectOfferSection";

type LocationStateType = {
  causeDonated?: Cause;
};

function SupportCausePage(): JSX.Element {
  const { secondary } = theme.colors.brand;
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();

  const { causes } = useCauses();
  const { state } = useLocation<LocationStateType>();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    if (!cause) {
      setCause(state?.causeDonated || causesFilter()[0]);
    }
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("treasureCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const handleDonateClick = () => {
    setFlow("cause");
    logEvent("treasureComCicleBtn_click");
    navigateTo({
      pathname: "/promoters/payment",
      state: {
        offer: currentOffer,
        flow: "cause",
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
    const PERCENTAGE_OF_INCREASE = 0.2;

    return `+ ${formatPrice(
      currentOffer.priceValue * PERCENTAGE_OF_INCREASE,
      currentOffer.currency,
    )}`;
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  const preSelectedIndex = () => {
    if (state?.causeDonated)
      return causesFilter().findIndex((c) => c.id === state?.causeDonated?.id);
    return cause ? causesFilter().findIndex((c) => c.id === cause?.id) : 0;
  };

  return (
    <S.Container>
      <DownloadAppToast />
      <S.Title>{t("title")}</S.Title>
      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        indexSelected={preSelectedIndex()}
        nameExtractor={(element) => element.name}
        backgroundColor={secondary[700]}
        textColorOutline={secondary[700]}
        borderColor={secondary[700]}
        borderColorOutline={secondary[300]}
      />
      <S.ContentContainer>
        <S.SupportImage src={cause?.coverImage} />
        <S.Intersection src={Intersection} />

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
