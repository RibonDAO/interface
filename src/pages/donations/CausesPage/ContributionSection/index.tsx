import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { Fragment } from "react";
import { useImpactConversion } from "hooks/useImpactConversion";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description, variation } =
    useImpactConversion();

  const { isMobile } = useBreakpoint();
  const contributionCard = () => (
    <>
      <S.Container>
        <S.ImageContainer>
          <S.Title>{t("title", { nonProfitName: nonProfit?.name })}</S.Title>
          <S.NonProfitImage src={contribution?.image} />
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

  if (contribution) return contributionCard() ?? <Fragment key={variation} />;

  return <Fragment key={variation} />;
}

export default ContributionSection;
