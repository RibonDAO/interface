import { Currencies, NonProfit, Offer } from "@ribon.io/shared/types";
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  description,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const campaignUrl =
      "https://projetos.ribon.io/dia-das-criancas?integration_id=9bee3412-6a49-4ddd-acfa-00e049fd3c99&offer=1000&target=non_profit&target_id=10&currency=BRL&subscription=false&utm_source=organic&utm_medium=organic&utm_campaign=organic&from=app_banners";
    window.location.replace(campaignUrl);
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
      <S.Description>{t("description")}</S.Description>
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
