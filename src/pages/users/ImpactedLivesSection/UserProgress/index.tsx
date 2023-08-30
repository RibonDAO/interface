import React from "react";
import { useTranslation } from "react-i18next";
import * as S from "./styles";

type Props = {
  currentExperience: number;
  totalExperienceToNextLevel: number;
  nextLevel: number;
  percentageCompleted: number;
};

function UserProgress({
  currentExperience,
  totalExperienceToNextLevel,
  nextLevel,
  percentageCompleted,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });
  const remainingExperience = totalExperienceToNextLevel - currentExperience;

  return (
    <S.ProgressBarContainer>
      <S.ProgressFill value={percentageCompleted} max={100} />
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
