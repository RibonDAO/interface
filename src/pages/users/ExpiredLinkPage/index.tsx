import LogoFull from "assets/icons/logo-full.svg";
import TopRightShape from "assets/images/top-right-shape.svg";
import BottomLeftShape from "assets/images/bottom-left-shape.svg";
import { useTranslation } from "react-i18next";

import Button from "components/atomics/buttons/Button";

import theme from "styles/theme";
import { useAuthentication } from "contexts/authenticationContext";
import { useLocation } from "react-router-dom";
import useNavigation from "hooks/useNavigation";
import ExpiredLinkLogo from "./assets/expired-link-logo.svg";
import * as S from "./styles";

type LocationStateType = {
  accountId: string;
};

function ExpiredLinkPage() {
  const { t } = useTranslation("translation", {
    keyPrefix: "expiredLinkPage",
  });

  const {
    state: { accountId },
  } = useLocation<LocationStateType>();

  const { sendAuthenticationEmail, emailSent } = useAuthentication();
  const { navigateTo } = useNavigation();

  const handleSendMeLinkButton = () => {
    sendAuthenticationEmail({
      accountId,
      onSuccess: () => {
        navigateTo({
          pathname: "/auth/sent-magic-link-email",
          state: { email: emailSent },
        });
      },
    });
  };

  return (
    <S.Container>
      <S.TopRightShape src={TopRightShape} aria-hidden="true" />
      <S.BottomLeftShape src={BottomLeftShape} aria-hidden="true" />
      <S.Logo src={LogoFull} aria-hidden="true" />
      <S.Image src={ExpiredLinkLogo} aria-hidden="true" />
      <S.Title>{t("expiredLink")}</S.Title>
      <S.Description>{t("expiredLinkText")}</S.Description>
      <Button
        text={t("buttonText")}
        onClick={handleSendMeLinkButton}
        backgroundColor={theme.colors.brand.primary[600]}
      />
    </S.Container>
  );
}

export default ExpiredLinkPage;
