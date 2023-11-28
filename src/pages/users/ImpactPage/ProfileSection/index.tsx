import { useUserLevel } from "contexts/userLevelContext";
import { useTranslation } from "react-i18next";

import UserAvatar from "pages/users/ImpactedLivesSection/UserAvatar";
import BackgroundShapeLeft from "pages/users/ImpactedLivesSection/assets/background-shape-left.svg";
import BackgroundShapeRight from "pages/users/ImpactedLivesSection/assets/background-shape-right.svg";
import * as S from "./styles";

function ImpactedLivesSection() {
  const { userLevel } = useUserLevel();

  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage.impactedLivesSection",
  });

  return (
    <S.Container>
      <S.BackgroundShapeLeft src={BackgroundShapeLeft} />
      <S.BackgroundShapeRight src={BackgroundShapeRight} />
      <S.CenterContainer>
        <UserAvatar level={userLevel} />
      </S.CenterContainer>
    </S.Container>
  );
}

export default ImpactedLivesSection;
