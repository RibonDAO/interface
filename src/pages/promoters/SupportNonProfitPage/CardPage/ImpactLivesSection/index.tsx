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

  const { value: isTicketTest } = useExperiment({
    key: "ticket-impact-test",
    variations: [false, true],
  });

  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportNonProfitPage.impactLivesSection",
  });

  const {
    userExperience,
    nextLevelExperience,
    userLevel,
    currentLevelExperience,
    percentageCompleted,
    updatePercentageCompleted,
  } = useUserLevel();

  useEffect(() => {
    updatePercentageCompleted();
  }, [updatePercentageCompleted]);

  if (!isInLifeBasedImpact && !isTicketTest) return null;

  const title = isInLifeBasedImpact ? t("title") : t("altTitle");
  const subtitle = isInLifeBasedImpact ? t("subtitle") : t("altSubtitle");

  return (
    <S.Container>
      <S.BackgroundShape src={BackgroundShape} alt="background-shape" />
      <S.Title>{title}</S.Title>
      <S.Subtitle>{subtitle}</S.Subtitle>
      {isInLifeBasedImpact && (
        <S.ProgressContainer>
          <UserProgress
            currentExperience={userExperience}
            currentLevelExperience={currentLevelExperience}
            totalExperienceToNextLevel={nextLevelExperience}
            nextLevel={userLevel + 1}
            percentageCompleted={percentageCompleted}
          />
        </S.ProgressContainer>
      )}
    </S.Container>
  );
}

export default ImpactLivesSection;
