import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLanguage } from "hooks/useLanguage";
import { theme } from "@ribon.io/shared/styles";
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

  const [currency, setCurrency] = useState<Currencies | undefined>();

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

  const { primary } = theme.colors.brand;

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

  return (
    <S.Container
      style={style}
      colorTheme={primary}
      data-testid="contribution-section-container"
    >
      {oldImpactFormat()}
    </S.Container>
  );
}

export default ContributionCard;
