import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { logEvent } from "lib/events";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
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
import extractUrlValue from "lib/extractUrlValue";
import { useCausesContext } from "contexts/causesContext";
import { SELECTED_CAUSE_ID } from "lib/sessionStorage/constants";
import { setSessionStorageItem } from "lib/sessionStorage";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import { useCauseContributionContext } from "contexts/causeContributionContext";
import * as S from "../styles";
import SelectOfferSection from "./SelectOfferSection";

type LocationStateType = {
  causeDonated?: Cause;
};

function SupportCausePage(): JSX.Element {
  const { secondary } = theme.colors.brand;
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();

  const { causes, isLoading } = useCausesContext();
  const { chosenCause, setChosenCause, setChosenCauseId } =
    useCauseContributionContext();
  const { state, search } = useLocation<LocationStateType>();

  const platform = extractUrlValue("platform", search);

  const isRunningTheNewCheckoutForm = true;

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportCausePage",
  });

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  useEffect(() => {
    if (!cause) {
      setCause(state?.causeDonated || chosenCause);
    }
    if (!isLoading) {
      setChosenCause(causes[0]);
    }
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("treasureCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
    setChosenCauseId(causeClicked?.id);
    setSessionStorageItem(SELECTED_CAUSE_ID, causeClicked?.id.toString());
  };

  const navigateToPayment = () => {
    setFlow("cause");
    logEvent("treasureComCicleBtn_click");
    navigateTo({
      pathname: "/promoters/payment",
      state: {
        offer: currentOffer,
        flow: "cause",
        cause,
        platform,
      },
    });
  };

  const navigateToCheckout = () => {
    logEvent("nonProfitComCicleBtn_click");
    setFlow("nonProfit");

    if (!cause) return;

    const searchParams = new URLSearchParams({
      offer: currentOfferIndex.toString(),
      target: "cause",
      target_id: cause.id.toString(),
      currency: currentOffer.currency.toUpperCase(),
    });

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
    });
  };

  const handleDonateClick = () => {
    if (isRunningTheNewCheckoutForm) {
      navigateToCheckout();
      return;
    }

    navigateToPayment();
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

  const handleOfferChange = (offer: Offer, index?: number) => {
    setCurrentOffer(offer);
    setCurrentOfferIndex(index || 0);
    setOfferId(offer.id);
  };

  if (causes.length === 0) {
    return <div />;
  }

  return (
    <S.Container>
      <DownloadAppToast />
      <S.Title>{t("title")}</S.Title>
      <GroupButtons
        elements={causes}
        onChange={handleCauseClick}
        indexSelected={chosenCause?.id}
        nameExtractor={(element) => element.name}
        backgroundColor={secondary[700]}
        textColorOutline={secondary[700]}
        borderColor={secondary[700]}
        borderColorOutline={secondary[300]}
      />
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
        <UserSupportBanner from="giveCauseCC_page" />
      </S.ContentContainer>

      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default SupportCausePage;
