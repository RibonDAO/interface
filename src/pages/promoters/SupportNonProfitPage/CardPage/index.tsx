import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState, Fragment } from "react";
import { logEvent } from "lib/events";
import { useNonProfits } from "@ribon.io/shared/hooks";
import { Cause, Offer, NonProfit } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";
import useNavigation from "hooks/useNavigation";
import offerFactory from "config/testUtils/factories/offerFactory";
import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import SliderCards from "components/moleculars/sliders/SliderCards";
import { useLocation } from "react-router-dom";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
import extractUrlValue from "lib/extractUrlValue";
import UserSupportBanner from "components/moleculars/banners/UserSupportBanner";
import { useCausesContext } from "contexts/causesContext";
import { useCauseContributionContext } from "contexts/causeContributionContext";
import { usePaymentInformation } from "contexts/paymentInformationContext";
import * as S from "../styles";
import NonProfitCard from "./NonProfitCard";

type LocationStateType = {
  causeDonated?: Cause;
};

function CardPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const [currentOffer, setCurrentOffer] = useState<Offer>(offerFactory());
  const { cause, setCause, setOfferId, setFlow } = usePaymentInformation();
  const { nonProfits } = useNonProfits();
  const { tertiary } = theme.colors.brand;

  const { causes } = useCausesContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();
  const { state, search } = useLocation<LocationStateType>();
  const integrationId = extractUrlValue("integration_id", search);

  const { isMobile } = useBreakpoint();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  const orderedNonProfits = () => {
    const ordered = causes
      .map((c) => nonProfits?.filter((np) => np.cause.name === c?.name))
      .flat(Infinity)
      .map((np: any) => np?.name)
      .join(", ");
    return ordered;
  };

  useEffect(() => {
    setCause(state?.causeDonated || causes[0]);
  });

  useEffect(() => {
    if (nonProfits && causes.length > 0) {
      logEvent("contributionCardsOrder_view", {
        nonProfits: orderedNonProfits() as any,
        causes: causes.map((c) => c.name).join(", ") as any,
      });
    }
  }, [nonProfits, causes]);

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCauseIndex(index);
    setChosenCause(causeClicked);
  };

  const navigateToCheckout = (nonProfit: NonProfit) => {
    logEvent("giveNgoBtn_start", {
      from: "giveNonProfit_page",
      nonProfitId: nonProfit.id,
      currency: currentOffer.currency,
      amount: currentOffer.priceValue,
    });
    setFlow("nonProfit");

    const searchParams = new URLSearchParams({
      offer: currentOffer.priceCents.toString(),
      target: "non_profit",
      target_id: nonProfit.id.toString(),
      currency: currentOffer.currency.toUpperCase(),
      integration_id: integrationId || "",
    });

    navigateTo({
      pathname: "/promoters/recurrence",
      search: searchParams.toString(),
    });
  };

  const handleDonateClick = (nonProfit: NonProfit) => {
    navigateToCheckout(nonProfit);
  };

  const handleOfferChange = (offer: Offer) => {
    setCurrentOffer(offer);
    setOfferId(offer.id);
  };

  const filteredNonProfits = useCallback(
    () =>
      nonProfits?.filter(
        (nonProfit) => nonProfit.cause.id === chosenCause?.id,
      ) || [],
    [cause, chosenCause, nonProfits],
  );

  const renderCurrentTitle = () => t("title");

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>{renderCurrentTitle()}</S.Title>
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
        elements={causes}
        onChange={handleCauseClick}
        indexSelected={chosenCauseIndex}
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
