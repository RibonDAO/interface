import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import useUserLevel from "hooks/useUserLevel";
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
  } = useUserLevel();

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
