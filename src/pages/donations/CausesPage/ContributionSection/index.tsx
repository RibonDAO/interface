import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import KidsDayCampaignImage from "./assets/kids-day-campaign-image.png";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description } = useImpactConversion();

  const { isMobile } = useBreakpoint();

  const contributionCard = () => (
    <>
      <S.Title>{t("title", { nonProfitName: nonProfit?.name })}</S.Title>
      <S.Container>
        <S.ImageContainer>
          <S.NonProfitImage src={KidsDayCampaignImage} />
        </S.ImageContainer>
        <ContributionCard
          description={description}
          impact={contribution?.impact}
          value={contribution?.value ?? 0}
          offer={offer}
          nonProfit={nonProfit}
          style={{
            width: isMobile ? "110%" : "100%",
            marginRight: isMobile ? "-16px" : "0",
            marginLeft: isMobile ? "-16px" : "0",
            borderRadius: isMobile ? "0" : "8px",
          }}
          from="kidsCampaignCTA"
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
