import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";
import Avatar from "../assets/avatar.svg";

type Props = {
  level: number;
};
function UserAvatar({ level }: Props) {
  const { currentUser } = useCurrentUser();

  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        <S.LevelLabel>Nv. {level}</S.LevelLabel>
        <S.Avatar src={Avatar} alt="user-avatar" />
      </S.AvatarContainer>
      <S.AvatarTitle>{currentUser?.email}</S.AvatarTitle>
    </S.AvatarSection>
  );
}

export default UserAvatar;
