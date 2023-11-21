import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useUserV1Config } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { logEvent } from "lib/events";
import { useAuthentication } from "contexts/authenticationContext";
import * as S from "./styles";

function DeleteAccountItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.deleteAccountItem",
  });

  const { logoutCurrentUser } = useCurrentUser();
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);

  const { accessToken } = useAuthentication();

  const { deleteUser } = useUserV1Config();

  function handleConfirmation() {
    setDeleteAccountModalVisible(true);
  }

  function handleDeleteAccount() {
    logEvent("deleteAccountConfirmBtn_click");
    setDeleteAccountModalVisible(false);
    deleteUser(accessToken);
    logoutCurrentUser();
  }

  return (
    <S.Container>
      <CardIconText
        text={t("deleteAccount")}
        icon="delete_forever"
        rightComponent={
          <S.GoButton src={ArrowRight} onClick={() => handleConfirmation()} />
        }
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
