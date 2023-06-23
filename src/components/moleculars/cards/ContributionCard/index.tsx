import { NonProfit, Offer } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import { newLogEvent } from "lib/events";
import { formatPrice } from "lib/formatters/currencyFormatter";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

export type Props = {
  title?: string;
  description: string | JSX.Element | undefined;
  impact: string;
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

  useEffect(() => {
    newLogEvent(
      "view",
      flow === "nonProfit" ? "contributeNgoBtn" : "contributeCauseBtn",
      {
        from,
      },
    );
  }, []);

  const handleClickedDonationButton = () => {
    newLogEvent("start", flow === "nonProfit" ? "giveNgoBtn" : "giveCauseBtn", {
      from: "donateTickets_page",
      value,
      coin: offer?.currency,
      nonProfitId: nonProfit?.id,
      causeId: nonProfit?.cause?.id,
      offerId: offer?.id,
    });

    navigateTo({
      pathname: "promoters/payment",
      state: {
        offer,
        nonProfit,
        flow,
        cause: nonProfit?.cause,
      },
    });
  };

  return (
    <S.Container style={style}>
      <S.Title>{title || t("titleCard")}</S.Title>
      <S.Value>
        {t("donate").replace("{{value}}", formatPrice(value, "brl"))}
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
