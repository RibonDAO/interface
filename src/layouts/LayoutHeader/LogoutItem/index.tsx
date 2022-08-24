import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";

import CardIconText from "components/moleculars/cards/CardIconText";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import warningIcon from "assets/icons/warning-icon.svg";
import successIcon from "assets/icons/success-icon.svg";
import letterIcon from "assets/icons/letter-icon.svg";
import theme from "styles/theme";
import * as S from "./styles";

function LogoutItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.logoutItem",
  });

  const { logoutCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [successLogoutModalVisible, setSuccessLogoutModalVisible] =
    useState(false);
  const { navigateTo } = useNavigation();

  function handleConfirmation() {
    setSuccessLogoutModalVisible(true);
    setWarningModalVisible(false);
  }

  function handleLogout() {
    logoutCurrentUser();
    navigateTo("/");
    setSuccessLogoutModalVisible(false);
  }

  useEffect(() => {
    if (currentUser) {
      setEmail(currentUser.email);
    }
  }, [currentUser]);

  return (
    <S.Container>
      <CardIconText
        text={email}
        icon={letterIcon}
        rightComponent={
          <S.LogoutButton
            outline
            text={t("logoutButton")}
            onClick={() => setWarningModalVisible(true)}
            textColor={theme.colors.red}
            borderColor={theme.colors.red}
            round
          />
        }
      />
      <ModalIcon
        visible={warningModalVisible}
        title={t("logoutModalTitle")}
        body={t("logoutModalSubtitle")}
        primaryButtonText={t("confirmModalButton")}
        secondaryButtonText={t("cancelModalButton")}
        icon={warningIcon}
        primaryButtonCallback={() => handleConfirmation()}
        secondaryButtonCallback={() => {
          setWarningModalVisible(false);
        }}
      />
      <ModalIcon
        visible={successLogoutModalVisible}
        title={t("successModalTitle")}
        primaryButtonText={t("successModalButton")}
        icon={successIcon}
        primaryButtonCallback={() => handleLogout()}
      />
    </S.Container>
  );
}

export default LogoutItem;
