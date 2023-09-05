import { useCurrentUser } from "contexts/currentUserContext";
import { useTranslation } from "react-i18next";
import * as S from "./styles";
import Avatar from "../assets/avatar.svg";

type Props = {
  level: number;
};
function UserAvatar({ level }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });
  const { currentUser } = useCurrentUser();

  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        <S.LevelLabel>
          {t("level")} {level}
        </S.LevelLabel>
        <S.Avatar src={Avatar} alt="user-avatar" />
      </S.AvatarContainer>
      <S.AvatarTitle>{currentUser?.email}</S.AvatarTitle>
    </S.AvatarSection>
  );
}

export default UserAvatar;
