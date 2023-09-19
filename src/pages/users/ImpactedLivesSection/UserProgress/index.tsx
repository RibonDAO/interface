import React from "react";
import { useTranslation } from "react-i18next";
import ProgressBar from "components/atomics/ProgressBar";
import { theme } from "@ribon.io/shared/styles";
import Heart from "assets/icons/heart.svg";
import * as S from "./styles";

type Props = {
  currentExperience: number;
  totalExperienceToNextLevel: number;
  currentLevelExperience: number;
  nextLevel: number;
  percentageCompleted: number;
};

function UserProgress({
  currentExperience,
  totalExperienceToNextLevel,
  currentLevelExperience,
  nextLevel,
  percentageCompleted,
}: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });
  const remainingExperience = totalExperienceToNextLevel - currentExperience;

  return (
    <S.ProgressBarContainer>
      <ProgressBar
        value={percentageCompleted}
        min={percentageCompleted}
        max={100}
        showPercentageLabel
        color={theme.colors.brand.tertiary[300]}
        textColor={theme.colors.brand.tertiary[900]}
      />
      <S.ProgressInfo>
        <S.LeftInfo>
          <S.Image src={Heart} />
          {`${currentExperience - currentLevelExperience} / ${
            totalExperienceToNextLevel - currentLevelExperience
          }`}
        </S.LeftInfo>
        <S.RightInfo>{`+${remainingExperience} ${t(
          "livesForLevel",
        )} ${nextLevel}`}</S.RightInfo>
      </S.ProgressInfo>
    </S.ProgressBarContainer>
  );
}

export default UserProgress;
