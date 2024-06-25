import CardCampaign from "components/moleculars/cards/CardCampaign";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import useImpressionCards from "hooks/useImpressionCards";
import { useCallback, useEffect, useState } from "react";
import { useLanguage } from "hooks/useLanguage";
import { Currencies } from "@ribon.io/shared/types";
import ImpressionCard from "types/entities/ImpressionCard";
import { useImpactConversion } from "hooks/useImpactConversion";
import { formatPrice } from "lib/formatters/currencyFormatter";
import * as S from "./styles";

export type Props = {
  cardId: number | string;
};

function CampaignSection({ cardId }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description } = useImpactConversion();
  const { currentLang } = useLanguage();

  const [currency, setCurrency] = useState<Currencies>(Currencies.BRL);

  useEffect(() => {
    if (offer) {
      setCurrency(offer?.currency === "brl" ? Currencies.BRL : Currencies.USD);
    } else {
      setCurrency(currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD);
    }
  }, [currentLang, offer]);

  const { isMobile } = useBreakpoint();

  const checkoutLink = () => {
    const nonProfitId = nonProfit?.id;
    const baseRecurrenceUrl = "https://dapp.ribon.io/promoters/recurrence";
    const baseRecurrenceParams = {
      offer: String(offer?.priceCents) || "1000",
      target: "non_profit",
      utm_source: "organic",
      utm_medium: "organic",
      utm_campaign: "organic",
      target_id: String(nonProfitId ?? 6),
      currency,
    };

    const params = new URLSearchParams(baseRecurrenceParams).toString();

    return `${baseRecurrenceUrl}?${params}`;
  };

  const defaultImpressionCard: ImpressionCard = {
    headline: t("titleCard"),
    title: t("donate", {
      value: formatPrice(
        (offer?.priceCents || 1000) / 100,
        currency.toLowerCase(),
      ),
    }),
    description: description || "",
    ctaText: t("button"),
    ctaUrl: checkoutLink(),
    image: nonProfit?.mainImage || nonProfit?.cause?.mainImage,
    active: true,
  };

  const [impressionCard, setImpressionCard] = useState<ImpressionCard>();

  const { getImpressionCard } = useImpressionCards();

  const fetchImpressionCard = useCallback(async () => {
    const impressionCardData = await getImpressionCard(cardId);
    setImpressionCard(impressionCardData);
  }, [cardId]);

  useEffect(() => {
    fetchImpressionCard();
  }, []);

  return contribution ? (
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
          from="organic"
          flow="nonProfit"
          cardData={impressionCard || defaultImpressionCard}
        />
      </S.Container>
      <S.NonProfitTitle>{t("nonProfits")}</S.NonProfitTitle>
    </>
  ) : (
    <S.NonProfitTitle>{t("nonProfits")}</S.NonProfitTitle>
  );
}

export default CampaignSection;
