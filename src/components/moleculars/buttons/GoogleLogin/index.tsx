import React from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { logEvent } from "lib/events";

import GoogleIcon from "assets/icons/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthentication } from "contexts/authenticationContext";

type Props = {
  onContinue: () => void;
};
function GoogleLogin({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInPage",
  });

  const { signInWithGoogle } = useAuthentication();

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      await signInWithGoogle(tokenResponse);
      onContinue();
    },
  });

  function handleGoogle() {
    logEvent("authGoogleBtn_click", {
      from: "donation_flow",
    });
    loginGoogle();
  }

  return (
    <Button
      text={t("google")}
      textColor={theme.colors.neutral[600]}
      backgroundColor="transparent"
      borderColor={theme.colors.neutral[300]}
      leftIcon={GoogleIcon}
      onClick={() => handleGoogle()}
    />
  );
}

export default GoogleLogin;
