import CardCampaign from "components/moleculars/cards/CardCampaign";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useImpactConversion } from "hooks/useImpactConversion";
import KidsDayCampaignImage from "./assets/kids-day-campaign-image.png";
import * as S from "./styles";

function CampaignSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit } = useImpactConversion();

  const { isMobile } = useBreakpoint();
  const campaignLink =
    "https://projetos.ribon.io/dia-das-criancas?integration_id=9bee3412-6a49-4ddd-acfa-00e049fd3c99&offer=1000&target=non_profit&target_id=10&currency=BRL&subscription=false&utm_source=app&utm_medium=banners&utm_campaign=dia_das_criancas";

  const contributionCard = () => (
    <>
      <S.Title>{t("title", { nonProfitName: nonProfit?.name })}</S.Title>
      <S.Container>
        <S.ImageContainer>
          <S.NonProfitImage src={KidsDayCampaignImage} />
        </S.ImageContainer>
        <CardCampaign
          value={contribution?.value ?? 0}
          style={{
            width: isMobile ? "110%" : "100%",
            marginRight: isMobile ? "-16px" : "0",
            marginLeft: isMobile ? "-16px" : "0",
            borderRadius: isMobile ? "0" : "8px",
          }}
          from="kidsCampaignCTA"
          flow="nonProfit"
          campaignLink={campaignLink}
        />
      </S.Container>
      <S.NonProfitTitle>{t("nonProfits")}</S.NonProfitTitle>
    </>
  );

  if (contribution) return contributionCard() ?? <div />;

  return <div />;
}

export default CampaignSection;
