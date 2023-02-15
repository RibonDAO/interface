import CardTopImage from "components/moleculars/cards/CardTopImage";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { useStatistics } from "@ribon.io/shared/hooks";
import { formatPriceWithZeros } from "lib/formatters/currencyFormatter";
import DownloadAppToast from "components/moleculars/Toasts/DownloadAppToast";
import { useLanguage } from "hooks/useLanguage";
import { coinByLanguage } from "lib/coinByLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
import ImpactMenu from "./ImpactMenu";
import TicketIcon from "./assets/ticket-icon.svg";
import MoneyIcon from "./assets/money-icon.svg";
import NgoIcon from "./assets/ngo-icon.svg";
import CausesIcon from "./assets/causes-icon.svg";
import * as S from "./styles";

function ImpactPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });

  const { currentUser } = useCurrentUser();
  const { userStatistics } = useStatistics({ userId: currentUser?.id });
  const { currentLang } = useLanguage();

  useEffect(() => {
    logEvent("profile_view");
  }, []);

  return (
    <S.Container>
      <DownloadAppToast />
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

      <S.ImpactMenuContainer>
        <ImpactMenu />
      </S.ImpactMenuContainer>
    </S.Container>
  );
}

export default ImpactPage;
