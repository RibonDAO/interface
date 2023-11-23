import React, { useState } from "react";
import Button from "components/atomics/buttons/Button";
import { useTranslation } from "react-i18next";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";
import AppleIcon from "assets/icons/apple-icon.svg";

import { useAuthentication } from "contexts/authenticationContext";
import AppleLoginProvider from "react-apple-login";
import { APPLE_CLIENT_ID, APPLE_REDIRECT_URL } from "utils/constants";
import { useLanguage } from "hooks/useLanguage";
import { useCurrentUser } from "contexts/currentUserContext";
import contactSupport from "lib/contactSupport";
import ModalDialog from "components/moleculars/modals/ModalDialog";

type Props = {
  onContinue: () => void;
};
function AppleLogin({ onContinue }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.buttons.AppleLogin",
  });

  const { signInWithApple } = useAuthentication();
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();
  const [modalVisible, setModalVisible] = useState(false);

  const renderModalWrongEmail = () => (
    <ModalDialog
      visible={modalVisible}
      title={t("wrongEmailModal.title")}
      description={t("wrongEmailModal.description", {
        email: currentUser?.email,
      })}
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

  const handleApple = async (response: any) => {
    logEvent("authAppleBtn_click", {
      from: "donation_flow",
    });
    if (!response.error) {
      try {
        await signInWithApple(response);
        onContinue();
      } catch (error: any) {
        if (error.message.includes("Email does not match")) {
          setModalVisible(true);
        }
      }
    }
  };

  return (
    <>
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
      {renderModalWrongEmail()}
    </>
  );
}

export default AppleLogin;
