import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";
import Avatar from "../assets/avatar.svg";

function UserAvatar() {
  const { currentUser } = useCurrentUser();

  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        <S.LevelLabel>Nv. 20</S.LevelLabel>
        <S.Avatar src={Avatar} alt="user-avatar" />
      </S.AvatarContainer>
      <S.AvatarTitle>{currentUser?.email}</S.AvatarTitle>
    </S.AvatarSection>
  );
}

export default UserAvatar;
