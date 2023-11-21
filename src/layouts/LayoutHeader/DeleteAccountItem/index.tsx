import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import { useUsers } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { logEvent } from "lib/events";
import * as S from "./styles";
import Item from "../SettingsMenu/Item";

function DeleteAccountItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.deleteAccountItem",
  });

  const { logoutCurrentUser } = useCurrentUser();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const { sendDeleteAccountEmail } = useUsers();

  function handleConfirmation() {
    setDeleteAccountModalVisible(true);
  }

  function handleDeleteAccount() {
    logEvent("deleteAccountConfirmBtn_click");
    setDeleteAccountModalVisible(false);
    sendDeleteAccountEmail();
    logoutCurrentUser();
  }

  return (
    <S.Container>
      <Item
        text={t("deleteAccount")}
        icon="delete_forever"
        onClickHandler={() => handleConfirmation()}
      />

      <ModalDialog
        visible={deleteAccountModalVisible}
        title={t("deleteAccountModalTitle")}
        description={t("deleteAccountModalDescription")}
        primaryButton={{
          text: t("deleteAccountModalButton"),
          onClick: () => handleDeleteAccount(),
        }}
        type="error"
        icon="delete_forever"
        secondaryButton={{
          text: t("cancelModalButton"),
          onClick: () => setDeleteAccountModalVisible(false),
        }}
      />
    </S.Container>
  );
}

export default DeleteAccountItem;
