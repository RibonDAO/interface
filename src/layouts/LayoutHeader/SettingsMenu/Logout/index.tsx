import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { logEvent } from "lib/events";
import Item from "../Item";

type Props = {
  closeMenu: () => void;
};

function Logout({ closeMenu }: Props): JSX.Element | null {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.logoutItem",
  });

  const { logoutCurrentUser, currentUser } = useCurrentUser();
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const { navigateTo } = useNavigation();
  const { createVoucher } = useVoucher();

  const handleLogout = () => {
    logEvent("signoutConfirmBtn_click");
    logoutCurrentUser();
    createVoucher();
    navigateTo("/auth/sign-in");
    window.location.reload();
  };

  const showModal = () => {
    setWarningModalVisible(true);
    logEvent("signoutBtn_click", {
      from: "config_page",
    });
  };

  const closeModal = () => {
    setWarningModalVisible(false);
    closeMenu();
  };

  if (!currentUser) return null;

  return (
    <>
      <Item
        icon={{ name: "logout" }}
        text={t("logoutButton")}
        onClickHandler={() => showModal()}
      />
      <ModalDialog
        visible={warningModalVisible}
        title={t("logoutModalTitle")}
        description={t("logoutModalSubtitle")}
        primaryButton={{
          text: t("confirmModalButton"),
          onClick: handleLogout,
        }}
        secondaryButton={{
          text: t("cancelModalButton"),
          onClick: closeModal,
        }}
        type="info"
        onClose={closeModal}
      />
    </>
  );
}

export default Logout;
