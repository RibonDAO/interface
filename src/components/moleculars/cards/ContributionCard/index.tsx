import { NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useLanguage } from "hooks/useLanguage";
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

  return (
    <S.Container style={style} data-testid="contribution-section-container">
      <S.Title>{title || t("titleCard")}</S.Title>
      <S.Value>
        {t("donate", {
          value: formatPrice(value, currentCurrency.toLowerCase()),
        })}
      </S.Value>
      <S.Description>
        {description} {impact && <b>{impact}</b>}
      </S.Description>
      <S.DonationButton
        onClick={() => handleClickedDonationButton()}
        text={t("button")}
      />
    </S.Container>
  );
}

export default ContributionCard;
