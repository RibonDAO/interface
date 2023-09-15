import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect, useState } from "react";
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
  testVariation?: Record<
    string,
    any
  > /* NOTE: Remove it at the end of AB testing */;
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
  testVariation = { value: false },
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });
  const { navigateTo } = useNavigation();
  const { currentLang } = useLanguage();

  const isTest = process.env.NODE_ENV === "test";
  const [currency, setCurrency] = useState<Currencies | undefined>();

  const variationUnderstanding = useExperiment({
    key: "understanding-test",
    variations: ["control", "growth"],
  });

  useEffect(() => {
    if (offer) {
      setCurrency(offer?.currency === "brl" ? Currencies.BRL : Currencies.USD);
    } else {
      setCurrency(currentLang === "pt-BR" ? Currencies.BRL : Currencies.USD);
    }
  }, [currentLang, offer]);

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
      variation: variationUnderstanding.value,
    });

    if (currency) {
      const searchParams = new URLSearchParams({
        offer: offer ? offer.priceCents.toString() : "0",
        target: flow === "nonProfit" ? "non_profit" : "cause",
        target_id:
          (flow === "nonProfit"
            ? nonProfit?.id.toString()
            : nonProfit?.cause?.id?.toString()) ?? "",
        currency,
      });
      navigateTo({
        pathname: "/promoters/recurrence",
        search: searchParams.toString(),
      });
    }
  };

  const { primary, tertiary } = theme.colors.brand;

  const variation = isTest
    ? testVariation
    : useExperiment({
        key: "progression-test-first-stage",
        variations: [false, true],
      });

  const oldImpactFormat = () => (
    <>
      <S.Title colorTheme={primary}>{title || t("titleCard")}</S.Title>
      {currency && (
        <S.Value colorTheme={primary}>
          {t("donate", {
            value: formatPrice(value, currency.toLowerCase()),
          })}
        </S.Value>
      )}
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

  const newImpactFormat = () => (
    <S.Centered>
      {currency && (
        <S.Value colorTheme={tertiary}>
          {t("donateAndImpact", {
            value: formatPrice(value, currency.toLowerCase()),
          })}
        </S.Value>
      )}
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
      colorTheme={variation.value ? tertiary : primary}
      data-testid="contribution-section-container"
    >
      {variation.value ? newImpactFormat() : oldImpactFormat()}
    </S.Container>
  );
}

export default ContributionCard;
