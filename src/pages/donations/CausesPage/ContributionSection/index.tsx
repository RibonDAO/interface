import ContributionCard from "components/moleculars/cards/ContributionCard";
import useBreakpoint from "hooks/useBreakpoint";
import { useTranslation } from "react-i18next";

import { Fragment, useEffect } from "react";
import { newLogEvent } from "lib/events";

import { useImpactConversion } from "hooks/useImpactConversion";
import * as S from "./styles";

function ContributionSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionSection",
  });

  const { contribution, nonProfit, offer, description, variation } =
    useImpactConversion();

  const { isMobile } = useBreakpoint();

  useEffect(() => {
    newLogEvent("view", "contributeNgoBtn", {
      from: "donateTickets_page",
    });
  }, []);

  return variation !== "Control" && contribution ? (
    <S.Container isMobile={isMobile}>
      <S.ImageContainer isMobile={isMobile}>
        <S.Title>
          {t("title").replace("{{nonProfitName}}", nonProfit?.name ?? "")}
        </S.Title>
        <S.NonProfitImage src={contribution?.image ?? ""} isMobile={isMobile} />
      </S.ImageContainer>
      <ContributionCard
        description={description}
        impact={contribution?.impact ?? ""}
        value={contribution?.value ?? 0}
        offer={offer}
        nonProfit={nonProfit}
        style={{
          marginTop: isMobile ? "0" : "48px",
          width: isMobile ? "110%" : "100%",
        }}
      />
    </S.Container>
  ) : (
    <Fragment key={variation} />
  );
}

export default ContributionSection;