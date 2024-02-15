import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import { Cause, Offer } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import offerFactory from "config/testUtils/factories/offerFactory";
import {
  formatPrice,
  removeInsignificantZeros,
} from "lib/formatters/currencyFormatter";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import { useLocation } from "react-router-dom";
import Intersection from "assets/images/intersection-image.svg";
import extractUrlValue from "lib/extractUrlValue";
import { useCausesContext } from "contexts/causesContext";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import { useCauseContributionContext } from "contexts/causeContributionContext";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import * as S from "../styles";
import SelectOfferSection from "./SelectOfferSection";

type LocationStateType = {
  causeDonated?: Cause;
};

function SupportCausePage(): JSX.Element {
  const { secondary } = theme.colors.brand;
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId, setFlow } = usePaymentInformation();

  const { causes, isLoading } = useCausesContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();

  const { state, search } = useLocation<LocationStateType>();

  const integrationId = extractUrlValue("integration_id", search);

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    if (!cause) {
      setCause(state?.causeDonated || chosenCause);
    }
  });

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCauseIndex(index);
    setChosenCause(causeClicked);
  };

  const navigateToCheckout = () => {
    logEvent("giveCauseBtn_start", {
      from: "giveCauseCC_page",
      causeId: cause?.id,
      amount: currentOffer.priceValue,
      currency: currentOffer.currency,
    });
    setFlow("nonProfit");

    if (!cause) return;

    const searchParams = new URLSearchParams({
      offer: currentOffer.priceCents.toString(),
      target: "cause",
      target_id: cause.id.toString(),
      currency: currentOffer.currency.toUpperCase(),
      integration_id: integrationId || "",
    });

    navigateTo({
      pathname: "/promoters/recurrence",
      search: searchParams.toString(),
    });
  };

  const handleDonateClick = () => {
    navigateToCheckout();
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

  if (causes.length === 0) {
    return <div />;
  }

  const addValueText = t("communityAddText");

  const buttonText = t("communityAddButtonText");

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      {!isLoading && (
        <S.GroupButtonsContainer>
          <GroupButtons
            elements={causes}
            onChange={handleCauseClick}
            indexSelected={chosenCauseIndex}
            nameExtractor={(element) => element.name}
            backgroundColor={secondary[700]}
            textColorOutline={secondary[700]}
            borderColor={secondary[700]}
            borderColorOutline={secondary[300]}
          />
        </S.GroupButtonsContainer>
      )}
      {chosenCause && (
        <S.ContentContainer>
          <S.SupportImage src={chosenCause?.coverImage} />
          <S.Intersection src={Intersection} />

          <S.DonateContainer>
            <S.GivingContainer>
              <S.ContributionContainer>
                <SelectOfferSection
                  cause={chosenCause}
                  onOfferChange={handleOfferChange}
                />
              </S.ContributionContainer>
              <S.CommunityAddContainer>
                <S.CommunityAddText>{addValueText}</S.CommunityAddText>
                <S.CommunityAddValue>{communityAddText()}</S.CommunityAddValue>
                <S.CommunityAddButton
                  text={buttonText}
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
          <UserSupportBanner from="giveCauseCC_page" />
        </S.ContentContainer>
      )}

      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportCausePage;
