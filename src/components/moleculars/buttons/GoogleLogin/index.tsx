import { useState } from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { logEvent } from "lib/events";

import GoogleIcon from "assets/icons/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthentication } from "contexts/authenticationContext";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import contactSupport from "lib/contactSupport";
import { useLanguage } from "hooks/useLanguage";

type Props = {
  onContinue: () => void;
};
function GoogleLogin({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.GoogleLogin",
  });

  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();
  const { signInWithGoogle } = useAuthentication();
  const [modalVisible, setModalVisible] = useState(false);

  const renderModalWrongEmail = () => (
      <ModalDialog
        visible={modalVisible}
        title={t("wrongEmailModal.title")}
        description={t("wrongEmailModal.description", { email: currentUser?.email })}
        primaryButton={{
          text: t("wrongEmailModal.tryAgain"),
          onClick: () => {
            setModalVisible(false);
          },
        }}
        secondaryButton={{
          text: t("wrongEmailModal.contactSupport"),
          onClick: () => {
            contactSupport(currentLang);
          },
        }}
        onClose={() => setModalVisible(false)}
      />
    );

  const loginGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse: any) => {
      try {
        await signInWithGoogle(tokenResponse);
        onContinue();
      } catch (error: any) {
        if (error.message.includes("Email does not match")) {
          setModalVisible(true);
        }
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
    <>
      <Button
        text={t("buttonText")}
        textColor={theme.colors.neutral[600]}
        backgroundColor="transparent"
        borderColor={theme.colors.neutral[300]}
        leftIcon={GoogleIcon}
        onClick={() => handleGoogle()}
      />
      {renderModalWrongEmail()}
    </>
  );
}

export default GoogleLogin;
