import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import LeftImage from "assets/images/bottom-left-shape.svg";
import RightImage from "assets/images/top-right-shape.svg";
import { isValidEmail } from "lib/validators";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useAuthentication } from "contexts/authenticationContext";
import UserAvatar from "../assets/user-avatar.svg";
import * as S from "./styles";

function InsertEmailPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "auth.insertEmailPage",
  });

  const [email, setEmail] = useState("");
  const { navigateTo } = useNavigation();

  const { sendAuthenticationEmail } = useAuthentication();

  useEffect(() => {
    logEvent("P28_view", {
      from: "sign_in",
    });
  }, []);

  const handleButtonPress = async () => {
    await sendAuthenticationEmail({ email });
    logEvent("authEmailFormBtn_click", {
      from: "sign_in",
    });
    navigateTo({
      pathname: "/auth/sent-magic-link-email",
      state: { email },
    });
  };

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
          <S.InputLabel htmlFor="email">{t("emailLabel")}</S.InputLabel>
          <S.Input
            name="email"
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <S.Button
            text={t("confirmText")}
            onClick={handleButtonPress}
            backgroundColor={theme.colors.brand.primary[600]}
            borderColor={theme.colors.brand.primary[600]}
            textColor={theme.colors.neutral[25]}
            disabled={!isValidEmail(email)}
            eventName="authEmailFormBtn_click"
            eventParams={{ from: "sign_in" }}
          />
        </S.ContentContainer>
      </div>
    </S.Container>
  );
}

export default InsertEmailPage;
