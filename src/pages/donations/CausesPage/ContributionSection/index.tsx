import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import {
  useNonProfits,
  useOffers,
  useStatistics,
} from "@ribon.io/shared/hooks";
import { Fragment, useCallback, useEffect } from "react";
import { newLogEvent } from "lib/events";
import { Currencies } from "@ribon.io/shared/types";
import { useExperiment } from "@growthbook/growthbook-react";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import NewImpact from "./newImpact.json";
import OldImpact from "./oldImpact.json";
import * as S from "./styles";

type ContributionProps = () =>
  | {
      description?: string;
      impact?: string;
      image: string;
      value: number;
      offerId: number;
      nonProfitId: number;
    }
  | undefined;

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

  const { formattedImpactText } = useFormattedImpactText();

  const nonProfit = nonProfits?.find(
    (n) => n.id === userStatistics?.lastDonatedNonProfit,
  );

  const { value } = useExperiment({
    key: "impact-conversion-staging",
    variations: ["Control", "NewImpact", "OldImpact"],
  });

  const contribution: ContributionProps = useCallback(() => {
    if (value === "NewImpact") {
      return NewImpact.find((o) => o.nonProfitId === nonProfit?.id);
    } else if (value === "OldImpact") {
      return OldImpact.find((o) => o.nonProfitId === nonProfit?.id);
    } else {
      return undefined;
    }
  }, [value, nonProfit]);

  const returnDescription = useCallback(() => {
    if (value === "NewImpact") {
      return contribution()?.description;
    } else if (value === "OldImpact") {
      return formattedImpactText(nonProfit, undefined, true, true);
    } else {
      return "description";
    }
  }, [value, contribution]);

  const offer = offers?.find((o) => o.id === 3);

  const { isMobile } = useBreakpoint();

  useEffect(() => {
    newLogEvent("view", "contributeNgoBtn", {
      from: "donateTickets_page",
    });
  }, []);

  return value !== "Control" ? (
    <S.Container isMobile={isMobile}>
      <S.ImageContainer isMobile={isMobile}>
        <S.Title>
          {t("title").replace("{{nonProfitName}}", nonProfit?.name ?? "")}
        </S.Title>
        <S.NonProfitImage
          src={contribution()?.image ?? ""}
          isMobile={isMobile}
        />
      </S.ImageContainer>
      <ContributionCard
        description={returnDescription}
        impact={contribution()?.impact ?? ""}
        title={t("titleCard").replace(
          "{{nonProfitName}}",
          nonProfit?.name ?? "",
        )}
        value={contribution()?.value ?? 0}
        offer={offer}
        nonProfit={nonProfit}
        style={{
          marginTop: isMobile ? "0" : "48px",
          width: isMobile ? "110%" : "100%",
        }}
      />
    </S.Container>
  ) : (
    <Fragment key={value} />
  );
}

export default ContributionSection;
