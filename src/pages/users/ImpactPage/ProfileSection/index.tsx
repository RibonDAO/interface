import { useTranslation } from "react-i18next";

import UserAvatar from "pages/users/ImpactedLivesSection/UserAvatar";
import BackgroundShapeLeft from "pages/users/ImpactedLivesSection/assets/background-shape-left.svg";
import BackgroundShapeRight from "pages/users/ImpactedLivesSection/assets/background-shape-right.svg";
import { useUserProfile } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

function ProfileSection() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.profileSection",
  });

  const { userProfile } = useUserProfile();
  const { currentUser } = useCurrentUser();

  const { profile } = userProfile();

  return (
    <S.Container>
      <S.BackgroundShapeLeft src={BackgroundShapeLeft} />
      <S.BackgroundShapeRight src={BackgroundShapeRight} />
      <S.CenterContainer>
        <UserAvatar
          userAvatar={profile?.photo}
          name={profile?.name ? profile.name : t("userName")}
          email={profile?.user.email ? profile.user.email : currentUser?.email}
        />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ProfileSection;
