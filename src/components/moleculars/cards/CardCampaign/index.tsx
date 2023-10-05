import { logEvent } from "lib/events";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

export type Props = {
  title?: string;
  value: number;
  style?: React.CSSProperties;
  from: string;
  flow?: "nonProfit" | "cause";
  campaignLink: string;
};

function CardCampaign({
  value,
  style,
  from,
  flow,
  title,
  campaignLink,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "campaignCard",
  });

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

  const handleClickedDonationButton = () => {
    logEvent(flow === "nonProfit" ? "giveNgoBtn_start" : "giveCauseBtn_start", {
      from,
      value,
      platform: "web",
    });
    window.location.replace(campaignLink);
  };

  const { primary } = theme.colors.brand;

  return (
    <S.Container
      style={style}
      colorTheme={primary}
      data-testid="contribution-section-container"
    >
      <S.Title colorTheme={primary}>{title || t("titleCard")}</S.Title>
      <S.Value colorTheme={primary}>{t("donate")}</S.Value>

      <S.Description>{t("description")}</S.Description>
      <S.DonationButton
        colorTheme={primary}
        onClick={() => handleClickedDonationButton()}
        text={t("button")}
      />
    </S.Container>
  );
}

export default CardCampaign;
