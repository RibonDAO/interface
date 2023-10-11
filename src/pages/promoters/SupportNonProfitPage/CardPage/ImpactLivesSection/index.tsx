import { useUserLevel } from "contexts/userLevelContext";
import { useTranslation } from "react-i18next";
import BackgroundShape from "assets/images/background-right-shape-pink.svg";
import { useEffect } from "react";
import * as S from "./styles";

function ImpactLivesSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.impactLivesSection",
  });

  const { updatePercentageCompleted } = useUserLevel();

  useEffect(() => {
    updatePercentageCompleted();
  }, [updatePercentageCompleted]);

  return (
    <S.Container>
      <S.BackgroundShape src={BackgroundShape} alt="background-shape" />
      <S.Title>{t("altTitle")}</S.Title>
      <S.Subtitle>{t("altSubtitle")}</S.Subtitle>
    </S.Container>
  );
}

export default ImpactLivesSection;
