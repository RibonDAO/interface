import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "services/analytics";

import useUserStatistics from "hooks/apiHooks/useStatistics";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import { useLanguage } from "hooks/useLanguage";
import { coinByLanguage } from "lib/coinByLanguage";
import TicketIcon from "./assets/ticket-icon.svg";
import MoneyIcon from "./assets/money-icon.svg";
import NgoIcon from "./assets/ngo-icon.svg";
import CausesIcon from "./assets/causes-icon.svg";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });

  const { userStatistics } = useUserStatistics();
  const { currentLang } = useLanguage();

  useEffect(() => {
    logEvent("profile_view");
  }, []);

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
    </S.Container>
  );
}

export default ImpactPage;
