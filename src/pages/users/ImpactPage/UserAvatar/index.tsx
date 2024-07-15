import { useTranslation } from "react-i18next";
import VerifiedIcon from "assets/icons/verified-icon.svg";
import LeftSparkle from "assets/images/sparkle-left.svg";
import RightSparkle from "assets/images/sparkle-right.svg";
import Avatar from "../assets/avatar.svg";
import * as S from "./styles";

type Props = {
  userAvatar?: string;
  email?: string;
  name?: string;
  isClubMember?: boolean;
};
function UserAvatar({ userAvatar, email, name, isClubMember }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.profileSection",
  });

  return (
    <S.AvatarSection>
      <S.AvatarContainer>
        <S.Avatar src={userAvatar || Avatar} alt="user-avatar" />
        {isClubMember && <S.LeftSparkle src={LeftSparkle} />}
        {isClubMember && <S.RightSparkle src={RightSparkle} />}
      </S.AvatarContainer>
      <S.ProfileSection>
        <S.Username>{name}</S.Username>
        <S.Email>{email}</S.Email>
        {isClubMember && (
          <S.TagContainer>
            <S.ClubTag>
              <S.TagText>{t("clubTagText")}</S.TagText>
            </S.ClubTag>
            <S.VerifiedIcon src={VerifiedIcon} alt="verified-icon" />
          </S.TagContainer>
        )}
      </S.ProfileSection>
    </S.AvatarSection>
  );
}

export default UserAvatar;
