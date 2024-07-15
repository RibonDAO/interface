import { useTranslation } from "react-i18next";
import { useSubscriptions, useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import { useEffect } from "react";
import UserAvatar from "pages/users/ImpactPage/UserAvatar";
import BackgroundShapeLeftGreen from "assets/images/background-shape-left-green.svg";
import BackgroundShapeRightGreen from "assets/images/background-shape-right-green.svg";
import BackgroundShapeRightRed from "assets/images/background-shape-right-red.svg";
import BackgroundShapeLeftRed from "assets/images/background-shape-left-red.svg";
import * as S from "./styles";

function ProfileSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.profileSection",
  });

  const { userProfile } = useUserProfile();
  const { currentUser } = useCurrentUser();
  const { profile } = userProfile();
  const { userIsClubMember } = useSubscriptions();
  const { isClubMember, refetch: refetchIsClubMember } = userIsClubMember();

  useEffect(() => {
    refetchIsClubMember();
  }, [currentUser]);

  return (
    <S.Container clubMember={isClubMember}>
      <S.BackgroundShapeLeft
        src={isClubMember ? BackgroundShapeLeftRed : BackgroundShapeLeftGreen}
      />
      <S.CenterContainer>
        <S.BackgroundShapeRight
          src={
            isClubMember ? BackgroundShapeRightRed : BackgroundShapeRightGreen
          }
        />
        <S.UserInfo>
          <UserAvatar
            userAvatar={profile?.photo}
            name={profile?.name ? profile.name : t("userName")}
            email={
              profile?.user?.email ? profile.user.email : currentUser?.email
            }
            isClubMember={isClubMember}
          />
        </S.UserInfo>
      </S.CenterContainer>
    </S.Container>
  );
}

export default ProfileSection;
