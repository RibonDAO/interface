import UserProgress from "pages/users/ImpactedLivesSection/UserProgress";
import UserAvatar from "./UserAvatar";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import * as S from "./styles";

function ImpactedLivesSection() {
  return (
    <S.Container>
      <S.CenterContainer>
        <UserAvatar level={20} />
        <ImpactedLivesCounter impactedLivesCount={160} />
        <UserProgress currentPoints={100} totalPointsToNextLevel={200} />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
