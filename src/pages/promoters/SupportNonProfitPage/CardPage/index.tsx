import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, Fragment } from "react";
import { logEvent } from "lib/events";
import { useCauses, useNonProfits } from "@ribon.io/shared/hooks";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import { Cause, Offer, NonProfit } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import offerFactory from "config/testUtils/factories/offerFactory";
import { useCardPaymentInformation } from "contexts/cardPaymentInformationContext";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import SliderCards from "components/moleculars/sliders/SliderCards";
import { useLocation } from "react-router-dom";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import extractUrlValue from "lib/extractUrlValue";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import * as S from "../styles";

import NonProfitCard from "./NonProfitCard";

type LocationStateType = {
  causeDonated?: Cause;
};

function CardPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();
  const { nonProfits } = useNonProfits();
  const { tertiary } = theme.colors.brand;

  const { causes } = useCauses();

  const { state, search } = useLocation<LocationStateType>();
  const platform = extractUrlValue("platform", search);

  const { isMobile } = useBreakpoint();

  const isRunningTheNewCheckoutForm = false;

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    logEvent("nonProfitSupportScreen_view");
  }, []);

  const causesFilter = () => {
    const causesApi = causes.filter((currentCause) => currentCause.active);
    return causesApi || [];
  };

  useEffect(() => {
    setCause(state?.causeDonated || causesFilter()[0]);
  }, [causes]);

  const handleCauseClick = (causeClicked: Cause) => {
    logEvent("nonProfitCauseSelection_click", {
      id: causeClicked?.id,
    });
    setCause(causeClicked);
  };

  const navigateToPayment = (nonProfit: NonProfit) => {
    setFlow("nonProfit");
    logEvent("giveNgoBtn_start", {
      causeId: cause?.id,
      amount: currentOffer.priceValue,
      currency: currentOffer.currency,
      from: "giveNonProfit_page",
    });
    navigateTo({
      pathname: "/promoters/payment",
      state: {
        offer: currentOffer,
        flow: "nonProfit",
        cause,
        nonProfit,
        platform,
      },
    });
  };

  const navigateToCheckout = (nonProfit: NonProfit) => {
    logEvent("nonProfitComCicleBtn_click");
    setFlow("nonProfit");

    const searchParams = new URLSearchParams({
      offer: currentOfferIndex.toString(),
      target: "non_profit",
      target_id: nonProfit.id.toString(),
      currency: currentOffer.currency.toUpperCase(),
    });

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
    });
  };

  const handleDonateClick = (nonProfit: NonProfit) => {
    if (isRunningTheNewCheckoutForm) {
      navigateToCheckout(nonProfit);
      return;
    }

    navigateToPayment(nonProfit);
  };

  const handleOfferChange = (offer: Offer, index?: number) => {
    setCurrentOffer(offer);
    setCurrentOfferIndex(index || 0);
    setOfferId(offer.id);
  };

  const filteredNonProfits = useCallback(
    () =>
      nonProfits?.filter((nonProfit) => nonProfit.cause.id === cause?.id) || [],
    [cause, nonProfits],
  );

  const preSelectedIndex = () =>
    state?.causeDonated
      ? causesFilter().findIndex((c) => c.id === state?.causeDonated?.id)
      : 0;

  return (
    <S.Container>
      <DownloadAppToast />
      <S.TitleContainer>
        <S.Title>{t("title")}</S.Title>
        {!isMobile && (
          <Tooltip
            text={t("tooltipImpactText")}
            symbol="?"
            textRight={t("tooltipImpact")}
            place="top"
            idTooltip="tooltipImpact"
            tooltipPosition="right"
          />
        )}
      </S.TitleContainer>

      <GroupButtons
        elements={causesFilter()}
        onChange={handleCauseClick}
        indexSelected={preSelectedIndex()}
        nameExtractor={(element) => element.name}
        backgroundColor={tertiary[800]}
        textColorOutline={tertiary[800]}
        borderColor={tertiary[800]}
        borderColorOutline={tertiary[200]}
      />
      <S.NonProfitsListContainer>
        <SliderCards scrollOffset={400} color={tertiary[400]}>
          {filteredNonProfits().map((nonProfit) => (
            <Fragment key={nonProfit.id}>
              <NonProfitCard
                nonProfit={nonProfit}
                handleOfferChange={handleOfferChange}
                handleDonate={() => handleDonateClick(nonProfit)}
              />
            </Fragment>
          ))}
        </SliderCards>
      </S.NonProfitsListContainer>
      {isMobile && (
        <S.TooltipSection>
          <Tooltip
            text={t("tooltipImpactText")}
            symbol="?"
            textRight={t("tooltipImpact")}
            place="bottom"
            tooltipPosition="right"
            idTooltip="tooltipImpact"
          />
        </S.TooltipSection>
      )}
      <UserSupportBanner from="giveNonProfit_page" />
      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default CardPage;
