import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import { useUserLevel } from "contexts/userLevelContext";
import { useExperiment } from "@growthbook/growthbook-react";
import { useTranslation } from "react-i18next";
import BackgroundShape from "assets/images/background-right-shape-pink.svg";
import { useEffect } from "react";
import * as S from "./styles";

function ImpactLivesSection() {
  const { value: isInLifeBasedImpact } = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.impactLivesSection",
  });

  const {
    userExperience,
    nextLevelExperience,
    userLevel,
    percentageCompleted,
    updatePercentageCompleted,
  } = useUserLevel();

  useEffect(() => {
    updatePercentageCompleted();
  }, []);

  if (!isInLifeBasedImpact) return null;

  return (
    <S.Container>
      <S.BackgroundShape src={BackgroundShape} alt="background-shape" />
      <S.Title>{t("title")}</S.Title>
      <S.Subtitle>{t("subtitle")}</S.Subtitle>
      <S.ProgressContainer>
        <UserProgress
          currentExperience={userExperience}
          totalExperienceToNextLevel={nextLevelExperience}
          nextLevel={userLevel + 1}
          percentageCompleted={percentageCompleted}
        />
      </S.ProgressContainer>
    </S.Container>
  );
}

export default ImpactLivesSection;
