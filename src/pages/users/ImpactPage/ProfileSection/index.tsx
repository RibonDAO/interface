import { useUserLevel } from "contexts/userLevelContext";
import { useEffect } from "react";
import useToast from "hooks/useToast";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import UserAvatar from "pages/users/ImpactedLivesSection/UserAvatar";
import BackgroundShapeLeft from "../assets/background-shape-left.svg";
import BackgroundShapeRight from "../assets/background-shape-right.svg";
import * as S from "./styles";

function ImpactedLivesSection() {
  const { userLevel } = useUserLevel();
  const toast = useToast();
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
