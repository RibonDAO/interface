import { NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { newLogEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

export type Props = {
  description: string | JSX.Element | undefined;
  impact: string;
  value: number;
  style?: React.CSSProperties;
  offer?: Offer;
  nonProfit?: NonProfit;
};

function ContributionCard({
  description,
  impact,
  value,
  style,
  offer,
  nonProfit,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionCard",
  });
  const { navigateTo } = useNavigation();

  const handleClickedDonationButton = () => {
    newLogEvent("start", "giveNgoBtn", {
      from: "donateTickets_page",
    });

    navigateTo({
      pathname: "promoters/payment",
      state: {
        offer,
        nonProfit,
        flow: "nonProfit",
      },
    });
  };

  return (
    <S.Container style={style}>
      <S.Title>{t("titleCard")}</S.Title>
      <S.Value>
        {t("donate").replace("{{value}}", formatPrice(value, "brl"))}
      </S.Value>
      <S.Description>
        {description} <b>{impact}</b>
      </S.Description>
      <S.DonationButton
        onClick={() => handleClickedDonationButton()}
        text={t("button")}
      />
    </S.Container>
  );
}

export default ContributionCard;
