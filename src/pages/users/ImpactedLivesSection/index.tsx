import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import useUserLevel from "hooks/useUserLevel";
import UserAvatar from "./UserAvatar";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import * as S from "./styles";

function ImpactedLivesSection() {
  const { userLevel, userExperience, experienceToNextLevel } = useUserLevel();

  return (
    <S.Container>
      <S.CenterContainer>
        <UserAvatar level={userLevel} />
        <ImpactedLivesCounter impactedLivesCount={userExperience} />
        <UserProgress
          currentExperience={userExperience}
          totalExperienceToNextLevel={experienceToNextLevel + userExperience}
          nextLevel={userLevel + 1}
        />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
