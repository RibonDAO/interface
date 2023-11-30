import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import useNavigation from "hooks/useNavigation";
import UserAvatar from "../assets/user-avatar.svg";
import * as S from "./styles";

function SignInPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.signInPage",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("P27_view", {
      from: "menu",
    });
  }, []);

  const onContinue = (pathname: string) => {
    navigateTo({
      pathname,
    });
  };

  return (
    <>
      <S.RightImage src={RightImage} />
      <S.LeftImage src={LeftImage} />
      <S.Container>
        <S.ImageContainer>
          <S.MainImage src={UserAvatar} />
        </S.ImageContainer>
        <S.ContentContainer>
          <S.Title>{t("title")}</S.Title>
          <S.ButtonContainer>
            <GoogleLogin onContinue={() => onContinue("/causes")} />
            <AppleLogin onContinue={() => onContinue("/causes")} />
            <MagicLinkLogin
              onContinue={() => onContinue("/auth/insert-email")}
            />
          </S.ButtonContainer>

          <S.FooterText>
            {t("footerStartText")}{" "}
            <a href={t("termsLink")} target="_blank" rel="noreferrer">
              {t("termsText")}
            </a>
            {t("footerEndText")}{" "}
            <a href={t("privacyPolicyLink")} target="_blank" rel="noreferrer">
              {t("privacyPolicyText")}
            </a>
          </S.FooterText>
        </S.ContentContainer>
      </S.Container>
    </>
  );
}

export default SignInPage;
