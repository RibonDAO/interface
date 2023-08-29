import React from "react";
import * as S from "./styles";

type Props = {
  currentPoints: number;
  totalPointsToNextLevel: number;
};
function UserProgress({ currentPoints, totalPointsToNextLevel }: Props) {
  const remainingPoints = totalPointsToNextLevel - currentPoints;

  return (
    <S.ProgressBarContainer>
      <S.ProgressFill value={currentPoints} max={totalPointsToNextLevel} />
      <S.ProgressInfo>
        <S.LeftInfo>{`${currentPoints} / ${totalPointsToNextLevel}`}</S.LeftInfo>
        <S.RightInfo>{`+${remainingPoints} for level ${Math.ceil(
          remainingPoints / totalPointsToNextLevel,
        )}`}</S.RightInfo>
      </S.ProgressInfo>
    </S.ProgressBarContainer>
  );
}

export default UserProgress;
