import { logEvent } from "lib/events";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import ImpressionCard from "types/entities/ImpressionCard";
import { theme } from "@ribon.io/shared/styles";
import { useImpactConversion } from "hooks/useImpactConversion";
import * as S from "./styles";

export type Props = {
  value: number;
  style?: React.CSSProperties;
  from: string;
  flow?: "nonProfit" | "cause";
  cardData?: ImpressionCard;
};

function CardCampaign({
  value,
  style,
  from,
  flow,
  cardData,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "campaignCard",
  });

  const { nonProfit } = useImpactConversion();

  useEffect(() => {
    logEvent(
      flow === "nonProfit"
        ? "contributeNgoBtn_view"
        : "contributeCauseBtn_view",
      {
        from,
        platform: "web",
      },
    );
  }, []);

  const parsedCtaUrl = (ctaUrl: string) => {
    const hasRecurrence = ctaUrl.includes("/recurrence");
    const hasTargetId = ctaUrl.includes("target_id");

    if (hasRecurrence && !hasTargetId) {
      return `${ctaUrl}&target_id=${nonProfit?.id}`;
    }

    return ctaUrl;
  };

  const handleClickedDonationButton = () => {
    if (!cardData) return;

    logEvent(flow === "nonProfit" ? "giveNgoBtn_start" : "giveCauseBtn_start", {
      from,
      value,
      platform: "web",
    });

    const url = parsedCtaUrl(cardData.ctaUrl);
    window.location.replace(url);
  };

  const { primary } = theme.colors.brand;

  return (
    <S.Container>
      {cardData?.image && (
        <S.ImageContainer>
          <S.Image src={cardData?.image || ""} />
        </S.ImageContainer>
      )}
      <S.TextContainer
        style={style}
        colorTheme={primary}
        data-testid="contribution-section-container"
      >
        <S.Title colorTheme={primary}>
          {cardData?.headline || t("titleCard")}
        </S.Title>
        <S.Value colorTheme={primary}>{cardData?.title || t("donate")}</S.Value>

        <S.Description>
          {cardData?.description || t("description")}
        </S.Description>
        <S.DonationButton
          colorTheme={primary}
          onClick={() => handleClickedDonationButton()}
          text={cardData?.ctaText || t("button")}
        />
      </S.TextContainer>
    </S.Container>
  );
}

export default CardCampaign;
