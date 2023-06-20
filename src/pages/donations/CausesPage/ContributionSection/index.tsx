import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { useEffect } from "react";
import { newLogEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { Currencies } from "@ribon.io/shared/types";
import NewImpact from "./newImpact.json";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });
  const { currentUser } = useCurrentUser();

  const { nonProfits } = useNonProfits();
  const { offers } = useOffers(Currencies.BRL, false);
  const { userStatistics } = useStatistics({
    userId: currentUser?.id ?? undefined,
  });

  const { navigateTo } = useNavigation();

  const nonProfit = nonProfits?.find(
    (n) => n.id === userStatistics?.lastDonatedNonProfit,
  );

  const contribution = NewImpact.find((c) => c.nonProfitId === 8);

  const offer = offers?.find((o) => o.id === 3);

  const { isMobile } = useBreakpoint();

  useEffect(() => {
    newLogEvent("view", "contributeNgoBtn", {
      from: "donateTickets_page",
    });
  }, []);

  console.log(offer, nonProfit);

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
    <S.Container isMobile={isMobile}>
      <S.ImageContainer isMobile={isMobile}>
        <S.Title>
          {t("title").replace("{{nonProfitName}}", nonProfit?.name ?? "")}
        </S.Title>
        <S.NonProfitImage src={contribution?.image ?? ""} isMobile={isMobile} />
      </S.ImageContainer>
      <ContributionCard
        description={contribution?.description ?? ""}
        title={t("titleCard").replace(
          "{{nonProfitName}}",
          nonProfit?.name ?? "",
        )}
        value={contribution?.value ?? 0}
        onClick={handleClickedDonationButton}
        style={{
          marginTop: isMobile ? "0" : "48px",
          width: isMobile ? "110%" : "100%",
        }}
      />
    </S.Container>
  );
}

export default ContributionSection;
