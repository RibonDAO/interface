import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { Fragment } from "react";

import { useImpactConversion } from "hooks/useImpactConversion";
import { handleVariation } from "lib/handleVariation";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description, variation } =
    useImpactConversion();

  const { isMobile } = useBreakpoint();
  const contributionWithVariation = () => (
    <>
      <S.Container isMobile={isMobile}>
        <S.ImageContainer isMobile={isMobile}>
          <S.Title>{t("title", { nonProfitName: nonProfit?.name })}</S.Title>
          <S.NonProfitImage src={contribution?.image} isMobile={isMobile} />
        </S.ImageContainer>
        <ContributionCard
          description={description}
          impact={contribution?.impact}
          value={contribution?.value ?? 0}
          offer={offer}
          nonProfit={nonProfit}
          style={{
            marginTop: isMobile ? "0" : "48px",
            width: isMobile ? "110%" : "100%",
            borderRadius: isMobile ? "0" : "8px",
          }}
          from="donateTickets_page"
          flow="nonProfit"
        />
      </S.Container>
      <S.NonProfitTitle>{t("nonProfits")}</S.NonProfitTitle>
    </>
  );

  const ContributionSectionWithVariation: JSX.Element | null = handleVariation(
    variation,
    contribution,
    null,
    contributionWithVariation,
    {},
  );

  return ContributionSectionWithVariation ?? <Fragment key={variation} />;
}

export default ContributionSection;
