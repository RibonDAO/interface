import React from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { logEvent } from "lib/events";

import GoogleIcon from "assets/icons/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthentication } from "contexts/authenticationContext";
// import ModalDialog from "components/moleculars/modals/ModalDialog";

type Props = {
  onContinue: () => void;
};
function GoogleSection({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInPage",
  });

  const { signInWithGoogle } = useAuthentication();
  // const renderModalWrongEmail = () => (
  //   <ModalDialog
  //     title={t("wrongEmailModal.title")}
  //     description={t("wrongEmailModal.description")}
  //     primaryButton={{
  //       text: t("wrongEmailModal.tryAgain"),
  //       onClick: () => {
  //         console.log("clicked");
  //       },
  //     }}
  //     secondaryButton={{
  //       text: t("wrongEmailModal.contactSupport"),
  //       onClick: () => {
  //         console.log("clicked");
  //       },
  //     }}
  //   />
  // );

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      try {
        await signInWithGoogle(tokenResponse);
        onContinue();
      } catch (error: any) {
        // if (error === "Email does not match") renderModalWrongEmail();
      }
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

export default GoogleSection;
