import UserAvatar from "./UserAvatar";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import * as S from "./styles";

function ImpactedLivesSection() {
  return (
    <S.Container>
      <S.CenterContainer>
        <UserAvatar />
        <ImpactedLivesCounter impactedLivesCount={160} />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
