import { useTranslation } from "react-i18next";
import { useCallback, useEffect, Fragment } from "react";
import { useNonProfits } from "@ribon.io/shared/hooks";
import { Cause } from "@ribon.io/shared/types";
import IntersectBackground from "assets/images/intersect-background.svg";

import GroupButtons from "components/moleculars/sections/GroupButtons";
import theme from "styles/theme";
import SliderCards from "components/moleculars/sliders/SliderCards";
import { useLocation } from "react-router-dom";
import Tooltip from "components/moleculars/Tooltip";
import useBreakpoint from "hooks/useBreakpoint";
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
  const { cause, setCause } = usePaymentInformation();
  const { nonProfits } = useNonProfits();
  const { tertiary } = theme.colors.brand;

  const { causes } = useCausesContext();
  const { chosenCause, setChosenCause, chosenCauseIndex, setChosenCauseIndex } =
    useCauseContributionContext();
  const { state } = useLocation<LocationStateType>();

  const { isMobile } = useBreakpoint();

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage",
  });

  useEffect(() => {
    setCause(state?.causeDonated || causes[0]);
  });

  const handleCauseClick = (causeClicked: Cause, index: number) => {
    setCause(causeClicked);
    setChosenCauseIndex(index);
    setChosenCause(causeClicked);
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
              <NonProfitCard nonProfit={nonProfit} />
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
