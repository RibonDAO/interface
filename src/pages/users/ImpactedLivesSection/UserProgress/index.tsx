import React from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/atomics/ProgressBar";
import { theme } from "@ribon.io/shared/styles";
import * as S from "./styles";

type Props = {
  currentExperience: number;
  totalExperienceToNextLevel: number;
  nextLevel: number;
};

function UserProgress({
  currentExperience,
  totalExperienceToNextLevel,
  nextLevel,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });
  const remainingExperience = totalExperienceToNextLevel - currentExperience;

  return (
    <S.ProgressBarContainer>
      <ProgressBar
        value={currentExperience}
        min={currentExperience}
        max={totalExperienceToNextLevel}
        showPercentageLabel
        color={theme.colors.brand.tertiary[300]}
        textColor={theme.colors.brand.tertiary[900]}
      />
      <S.ProgressInfo>
        <S.LeftInfo>{`${currentExperience} / ${totalExperienceToNextLevel}`}</S.LeftInfo>
        <S.RightInfo>{`+${remainingExperience} ${t(
          "livesForLevel",
        )} ${nextLevel}`}</S.RightInfo>
      </S.ProgressInfo>
    </S.ProgressBarContainer>
  );
}

export default UserProgress;
