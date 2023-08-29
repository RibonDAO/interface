import { useCurrentUser } from "contexts/currentUserContext";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import * as S from "./styles";
import Avatar from "./assets/avatar.svg";

function ImpactedLivesSection() {
  const { currentUser } = useCurrentUser();
  return (
    <S.Container>
      <S.CenterContainer>
        <S.AvatarContainer>
          <S.Avatar src={Avatar} alt="user-avatar" />
        </S.AvatarContainer>
        <S.AvatarTitle>{currentUser?.email}</S.AvatarTitle>
        <ImpactedLivesCounter impactedLivesCount={160} />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
