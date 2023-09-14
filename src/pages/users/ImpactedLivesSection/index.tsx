import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import { useUserLevel } from "contexts/userLevelContext";
import { useEffect } from "react";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import BackgroundShapeLeft from "./assets/background-shape-left.svg";
import BackgroundShapeRight from "./assets/background-shape-right.svg";
import UserAvatar from "./UserAvatar";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import * as S from "./styles";

function ImpactedLivesSection() {
  const {
    userLevel,
    userExperience,
    nextLevelExperience,
    percentageCompleted,
    updatePercentageCompleted,
    refetchUserStatistics,
  } = useUserLevel();
  const toast = useToast();
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });

  useEffect(() => {
    refetchUserStatistics();
    const previousPercentageCompleted = percentageCompleted;

    setTimeout(() => {
      const completedPercentage = updatePercentageCompleted();
      const levelUp = completedPercentage < previousPercentageCompleted;

      if (levelUp) {
        toast({
          message: t("onLevelUp"),
          type: "custom",
          backgroundColor: theme.colors.feedback.success[50],
          borderColor: theme.colors.brand.primary[500],
          textColor: theme.colors.brand.primary[900],
          icon: "celebration",
          iconColor: theme.colors.brand.primary[500],
          position: "top-right",
        });
      }
    }, 500);
  }, [updatePercentageCompleted]);

  return (
    <S.Container>
      <S.BackgroundShapeLeft src={BackgroundShapeLeft} />
      <S.BackgroundShapeRight src={BackgroundShapeRight} />
      <S.CenterContainer>
        <UserAvatar level={userLevel} />
        <ImpactedLivesCounter impactedLivesCount={userExperience} />
        <UserProgress
          currentExperience={userExperience}
          totalExperienceToNextLevel={nextLevelExperience}
          nextLevel={userLevel + 1}
          percentageCompleted={percentageCompleted}
        />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
