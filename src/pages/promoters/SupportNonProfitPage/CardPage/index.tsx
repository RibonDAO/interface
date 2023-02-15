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
import * as S from "../styles";
import UserSupportSection from "../../SupportTreasurePage/CardSection/UserSupportSection";
import NonProfitCard from "./NonProfitCard";

type LocationStateType = {
  causeDonated?: Cause;
};

function CardPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId, setFlow } = useCardPaymentInformation();
  const { nonProfits } = useNonProfits();
  const { tertiary } = theme.colors.brand;

  const { causes } = useCauses();
  const { state } = useLocation<LocationStateType>();
  const { isMobile } = useBreakpoint();

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

  const handleDonateClick = (nonProfit: NonProfit) => {
    setFlow("nonProfit");
    logEvent("nonProfitComCicleBtn_click");
    navigateTo({
      pathname: "/promoters/payment",
      state: {
        offer: currentOffer,
        flow: "nonProfit",
        cause,
        nonProfit,
      },
    });
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
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
      <UserSupportSection />
      <S.BackgroundImage src={IntersectBackground} />
    </S.Container>
  );
}

export default CardPage;
