import CardCampaign from "components/moleculars/cards/CardCampaign";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { logError } from "services/crashReport";
import useImpressionCards from "hooks/useImpressionCard";
import { useCallback, useEffect, useState } from "react";
import ImpressionCard from "types/entities/ImpressionCard";
import { useImpactConversion } from "hooks/useImpactConversion";
import * as S from "./styles";

export type Props = {
  cardId: number | string;
};

function CampaignSection({ cardId }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit } = useImpactConversion();
  const { isMobile } = useBreakpoint();
  const [impressionCard, setImpressionCard] = useState<ImpressionCard | null>();

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = useCallback(async () => {
    try {
      const impressionCardData = await getImpressionCard(cardId);
      setImpressionCard(impressionCardData);
    } catch (e) {
      logError(e);
    }
  }, [cardId]);

  useEffect(() => {
    fetchImpressionCard();
  }, []);

  return contribution && impressionCard ? (
    <>
      <S.Title>{t("title", { nonProfitName: nonProfit?.name })}</S.Title>
      <S.Container>
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
          cardData={impressionCard}
        />
      </S.Container>
      <S.NonProfitTitle>{t("nonProfits")}</S.NonProfitTitle>
    </>
  ) : (
    <div />
  );
}

export default CampaignSection;
