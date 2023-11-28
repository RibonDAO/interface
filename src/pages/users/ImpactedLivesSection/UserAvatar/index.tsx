import { useTranslation } from "react-i18next";
import * as S from "./styles";
import Avatar from "../assets/avatar.svg";

type Props = {
  level?: number;
  userAvatar?: string;
  email?: string;
  name?: string;
};
function UserAvatar({ level, userAvatar, email, name }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });

  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        {level && (
          <S.LevelLabel>
            {t("level")} {level}
          </S.LevelLabel>
        )}
        <S.Avatar src={userAvatar || Avatar} alt="user-avatar" />
      </S.AvatarContainer>
      <S.ProfileSection>
        <S.Username>{name}</S.Username>
        <S.Email>{email}</S.Email>
      </S.ProfileSection>
    </S.AvatarSection>
  );
}

export default UserAvatar;
