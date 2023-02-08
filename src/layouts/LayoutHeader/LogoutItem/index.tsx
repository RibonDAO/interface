import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";

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
  const { tertiary } = theme.colors.brand;

  const { logoutCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const [successLogoutModalVisible, setSuccessLogoutModalVisible] =
    useState(false);
  const { navigateTo } = useNavigation();
  const { createVoucher } = useVoucher();

  function handleConfirmation() {
    setSuccessLogoutModalVisible(true);
    setWarningModalVisible(false);
  }

  function handleLogout() {
    logoutCurrentUser();
    createVoucher();
    navigateTo("/");
    setSuccessLogoutModalVisible(false);
    window.location.reload();
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
            textColor={tertiary[400]}
            borderColor={tertiary[400]}
            round
          />
        }
      />
      <ModalIcon
        visible={warningModalVisible}
        title={t("logoutModalTitle")}
        body={t("logoutModalSubtitle")}
        primaryButton={{
          text: t("confirmModalButton"),
          onClick: handleConfirmation,
        }}
        secondaryButton={{
          text: t("cancelModalButton"),
          onClick: () => setWarningModalVisible(false),
        }}
        icon={warningIcon}
      />
      <ModalIcon
        visible={successLogoutModalVisible}
        title={t("successModalTitle")}
        primaryButton={{
          text: t("successModalButton"),
          onClick: handleLogout,
        }}
        icon={successIcon}
      />
    </S.Container>
  );
}

export default LogoutItem;
