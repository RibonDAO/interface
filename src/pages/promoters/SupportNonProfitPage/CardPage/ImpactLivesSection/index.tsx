import { useUserLevel } from "contexts/userLevelContext";
import { useExperiment } from "@growthbook/growthbook-react";
import { useTranslation } from "react-i18next";
import BackgroundShape from "assets/images/background-right-shape-pink.svg";
import { useEffect } from "react";
import * as S from "./styles";

function ImpactLivesSection() {
  const { value: isTicketTest } = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.impactLivesSection",
  });

  const { updatePercentageCompleted } = useUserLevel();

  useEffect(() => {
    updatePercentageCompleted();
  }, [updatePercentageCompleted]);

  if (!isTicketTest) return null;

  return (
    <S.Container>
      <S.BackgroundShape src={BackgroundShape} alt="background-shape" />
      <S.Title>{t("altTitle")}</S.Title>
      <S.Subtitle>{t("altSubtitle")}</S.Subtitle>
    </S.Container>
  );
}

export default ImpactLivesSection;
