import { NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { useExperiment } from "@growthbook/growthbook-react";
import { theme } from "@ribon.io/shared/styles";
import HeartIcon from "assets/icons/heart.svg";
import * as S from "./styles";

export type Props = {
  title?: string;
  description: string | JSX.Element | undefined;
  impact?: string;
  value: number;
  style?: React.CSSProperties;
  offer?: Offer;
  nonProfit?: NonProfit;
  from: string;
  flow?: string;
};

function ContributionCard({
  description,
  impact,
  value,
  style,
  offer,
  nonProfit,
  from,
  flow,
  title,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });
  const { navigateTo } = useNavigation();
  const { currentLang } = useLanguage();

  const currentCurrency =
    offer?.currency?.toUpperCase() ?? currentLang === "pt-BR" ? "BRL" : "USD";

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
      coin: offer?.currency,
      nonProfitId: nonProfit?.id,
      causeId: nonProfit?.cause?.id,
      offerId: offer?.id,
      platform: "web",
    });

    const searchParams = new URLSearchParams({
      offer: "0",
      target: flow === "nonProfit" ? "non_profit" : "cause",
      target_id:
        (flow === "nonProfit"
          ? nonProfit?.id.toString()
          : nonProfit?.cause?.id?.toString()) ?? "",
      currency: currentCurrency,
    });

    navigateTo({
      pathname: "/promoters/checkout",
      search: searchParams.toString(),
    });
  };

  const { primary, tertiary } = theme.colors.brand;

  const variation = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const oldImpactFormatter = () => (
    <>
      <S.Title colorTheme={primary}>{title || t("titleCard")}</S.Title>
      <S.Value colorTheme={primary}>
        {t("donate", {
          value: formatPrice(value, currentCurrency.toLowerCase()),
        })}
      </S.Value>
      <S.Description>
        {description} {impact && <b>{impact}</b>}
      </S.Description>
      <S.DonationButton
        colorTheme={primary}
        onClick={() => handleClickedDonationButton()}
        text={t("button")}
      />
    </>
  );

  const newImpactFormatter = () => (
    <S.Centered>
      <S.Value colorTheme={tertiary}>
        {t("donateAndImpact", {
          value: formatPrice(value, currentCurrency.toLowerCase()),
        })}
      </S.Value>
      <S.LifeAmount>
        <S.HeartIcon src={HeartIcon} aria-hidden alt="life icon" />
        {t("livesAmount", {
          value: Math.round(Number(offer?.priceValue ?? 50) * 2),
        })}
      </S.LifeAmount>
      <S.ImpactDescription>
        {t("impactDescription", {
          value: nonProfit?.impactDescription.split(",")[0],
        })}
      </S.ImpactDescription>
      <S.DonationButton
        colorTheme={tertiary}
        onClick={() => handleClickedDonationButton()}
        text={t("button")}
      />
    </S.Centered>
  );

  return (
    <S.Container
      style={style}
      colorTheme={!variation.value ? tertiary : primary}
      data-testid="contribution-section-container"
    >
      {!variation.value ? newImpactFormatter() : oldImpactFormatter()}
    </S.Container>
  );
}

export default ContributionCard;
