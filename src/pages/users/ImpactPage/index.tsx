import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics/firebase";
import useImpact from "hooks/apiHooks/useImpact";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import useUserStatistics from "hooks/apiHooks/useStatistics";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useLanguage } from "hooks/useLanguage";
import { coinByLanguage } from "lib/coinByLanguage";
import TicketIcon from "./assets/ticket-icon.svg";
import MoneyIcon from "./assets/money-icon.svg";
import NgoIcon from "./assets/ngo-icon.svg";
import CausesIcon from "./assets/causes-icon.svg";
import * as S from "./styles";
import TicketSection from "./ImpactMenu/TicketSection";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });

  const { userImpact } = useImpact();
  const { userStatistics } = useUserStatistics();
  const { currentLang } = useLanguage();
  const { formattedImpactText } = useFormattedImpactText();

  useEffect(() => {
    logEvent("profile_view");
  }, []);

  const impactCards = userImpact || [];
  const impactItems = impactCards.filter(
    (item) => item.impact.toString() !== "0",
  );
  const hasImpact = impactItems.length > 0;

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <S.CardsButtonContainer>
        <CardTopImage
          text={t("donatedTickets")}
          icon={TicketIcon}
          title={userStatistics?.totalTickets ?? 0}
          size="small"
        />
        <CardTopImage
          text={t("donatedMoney")}
          icon={MoneyIcon}
          size="small"
          title={formatPriceWithZeros(
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
          title={userStatistics?.totalNonProfits ?? 0}
          size="small"
        />
        <CardTopImage
          text={t("supporterCauses")}
          icon={CausesIcon}
          title={userStatistics?.totalCauses ?? 0}
          size="small"
        />
      </S.CardsButtonContainer>
      {hasImpact ? (
        <S.CardsContainer>
          {impactItems.map((item: any) => (
            <CardTopImage
              key={item.nonProfit.id}
              title={item.nonProfit.name}
              text={
                formattedImpactText(
                  item.nonProfit,
                  item.impact,
                  false,
                  true,
                  undefined,
                  t("impactText"),
                ) || ""
              }
              icon={item.nonProfit.logo}
              size="large"
            />
          ))}
        </S.CardsContainer>
      ) : (
        <TicketSection />
      )}
    </S.Container>
  );
}

export default ImpactPage;
