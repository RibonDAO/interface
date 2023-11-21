import React from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";
import AppleIcon from "assets/icons/apple-icon.svg";

import { useAuthentication } from "contexts/authenticationContext";
import AppleLoginProvider from "react-apple-login";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URL } from "utils/constants";

type Props = {
  onContinue: () => void;
};
function AppleLogin({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.AppleLogin",
  });

  const { signInWithApple } = useAuthentication();

  const handleApple = async (response: any) => {
    logEvent("authAppleBtn_click", {
      from: "donation_flow",
    });
    if (!response.error) {
      await signInWithApple(response);
      onContinue();
    }
  };

  return (
    <AppleLoginProvider
      clientId={APPLE_CLIENT_ID}
      redirectURI={APPLE_REDIRECT_URL}
      usePopup
      callback={handleApple}
      responseMode="query"
      scope="name email"
      render={(renderProps) => (
        <Button
          text={t("buttonText")}
          textColor={theme.colors.neutral[600]}
          backgroundColor="transparent"
          borderColor={theme.colors.neutral[300]}
          leftIcon={AppleIcon}
          onClick={renderProps.onClick}
        />
      )}
    />
  );
}

export default AppleLogin;