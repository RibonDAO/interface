import { useState } from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";

import { logEvent } from "lib/events";

import GoogleIcon from "assets/icons/google-icon.svg";
import { useGoogleLogin } from "@react-oauth/google";
import { useAuthentication } from "contexts/authenticationContext";
import ModalWrongEmail from "components/moleculars/modals/ModalWrongEmail";

type Props = {
  onContinue: () => void;
  from: string;
};
function GoogleLogin({ onContinue, from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.GoogleLogin",
  });

  const { signInWithGoogle } = useAuthentication();
  const [modalVisible, setModalVisible] = useState(false);

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
      from,
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
      <ModalWrongEmail visible={modalVisible} setVisible={setModalVisible} />
    </>
  );
}

export default GoogleLogin;
