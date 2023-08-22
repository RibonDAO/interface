import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import { useExperiment } from "@growthbook/growthbook-react";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description } = useImpactConversion();

  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const { isMobile } = useBreakpoint();

  const contributionCard = () => (
    <>
      <S.Title>
        {variation.value
          ? t("titleNewImpact", { nonProfitName: nonProfit?.name })
          : t("title", { nonProfitName: nonProfit?.name })}
      </S.Title>
      <S.Container>
        <S.ImageContainer>
          <S.NonProfitImage src={contribution?.image} />
        </S.ImageContainer>
        <ContributionCard
          description={description}
          impact={contribution?.impact}
          value={contribution?.value ?? 0}
          offer={offer}
          nonProfit={nonProfit}
          style={{
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

  if (contribution) return contributionCard() ?? <div />;

  return <div />;
}

export default ContributionSection;
