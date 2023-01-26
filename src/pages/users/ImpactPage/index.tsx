import CardTopImage from "components/moleculars/cards/CardTopImage";
import { Fragment, useEffect } from "react";
import { impactNormalizer } from "@ribon.io/shared/lib";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

import useUserStatistics from "hooks/apiHooks/useStatistics";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useLanguage } from "hooks/useLanguage";
import { coinByLanguage } from "lib/coinByLanguage";
import useImpact from "hooks/apiHooks/useImpact";
import CardTopImageText from "components/moleculars/cards/CardTopImageText";
import TicketIcon from "./assets/ticket-icon.svg";
import MoneyIcon from "./assets/money-icon.svg";
import NgoIcon from "./assets/ngo-icon.svg";
import CausesIcon from "./assets/causes-icon.svg";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });
  const { t: normalizerTranslation } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });
  const { userImpact } = useImpact();

  const { userStatistics } = useUserStatistics();
  const { currentLang } = useLanguage();

  useEffect(() => {
    logEvent("profile_view");
  }, []);

  const impactCards = () => userImpact || [];
  const hasImpact = () => impactCards().length > 0;

  // TODO: Remove this fallback when all nonProfits are using the new impact
  const formattedImpactText = (item: any) => {
    const { nonProfit, impact } = item;
    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const roundedImpact = impact;

    if (roundedImpact && impacts && nonProfitsImpactsLength) {
      const lastImpact = impacts[nonProfitsImpactsLength - 1];
      if (lastImpact.donorRecipient) {
        const normalizedImpact = impactNormalizer(
          nonProfit,
          roundedImpact,
          normalizerTranslation,
        );

        return (
          <>
            {normalizedImpact.map((slice, index) => (
              <Fragment key={index.toString()}>
                {index % 2 === 0 ? <b>{slice}</b> : slice}{" "}
              </Fragment>
            ))}
          </>
        );
      }
    }
    return `${t("impactText")} ${item.impact.toString()} ${
      item.nonProfit.impactDescription
    }`;
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.CardsButtonContainer>
        <S.Wrapper>
          <CardTopImage
            text={t("donatedTickets")}
            icon={TicketIcon}
            value={userStatistics?.totalTickets ?? 0}
          />
          <CardTopImage
            text={t("donatedMoney")}
            icon={MoneyIcon}
            value={formatPriceWithZeros(
              currentLang === "pt-BR"
                ? userStatistics?.totalDonated?.brl ?? 0
                : userStatistics?.totalDonated?.usd ?? 0,
              coinByLanguage(currentLang),
              currentLang,
            )}
          />
          <CardTopImage
            text={t("supportedNgos")}
            icon={NgoIcon}
            value={userStatistics?.totalNonProfits ?? 0}
          />
          <CardTopImage
            text={t("supporterCauses")}
            icon={CausesIcon}
            value={userStatistics?.totalCauses ?? 0}
          />
        </S.Wrapper>
      </S.CardsButtonContainer>
      {hasImpact() && (
        <S.CardsContainer>
          {impactCards().map(
            (item: any) =>
              item.impact.toString() !== "0" && (
                <CardTopImageText
                  key={item.nonProfit.id}
                  title={item.nonProfit.name}
                  text={formattedImpactText(item)}
                  imageUrl={item.nonProfit.logo}
                  imageAlt={item.impact}
                />
              ),
          )}
        </S.CardsContainer>
      )}
    </S.Container>
  );
}

export default ImpactPage;
