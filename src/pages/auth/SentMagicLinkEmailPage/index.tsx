import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { logEvent } from "lib/events";
import { useLocation } from "react-router-dom";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import useNavigation from "hooks/useNavigation";
import theme from "styles/theme";
import UserAvatar from "../assets/user-avatar.svg";
import * as S from "./styles";

type LocationStateType = {
  email?: string;
};

function SentMagicLinkEmailPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.sentMagicLinkEmailPage",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P29_view", {
      from: "direct_flow",
    });
  }, []);

  const {
    state: { email },
  } = useLocation<LocationStateType>();

  useAvoidBackButton();
  return (
    <S.Container>
      <S.LeftImage src={LeftImage} />
      <S.RightImage src={RightImage} />
      <div>
        <S.ImageContainer>
          <S.MainImage src={UserAvatar} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.Text>{t("firstText")}</S.Text>
          <S.EmailText>{email}</S.EmailText>
          <S.Text>{t("secondText")}</S.Text>
          <S.ButtonContinue
            text={t("button")}
            backgroundColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral[25]}
            onClick={() => navigateTo("/causes")}
          />
        </S.ContentContainer>
      </div>
    </S.Container>
  );
}

export default SentMagicLinkEmailPage;
