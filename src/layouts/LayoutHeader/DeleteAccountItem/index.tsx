import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import ArrowRight from "assets/icons/arrow-right-blue-icon.svg";
import CardIconText from "components/moleculars/cards/CardIconText";
import { useUsers, useUserV1Config } from "@ribon.io/shared/hooks";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { theme } from "@ribon.io/shared/styles";
import { logEvent } from "lib/events";
import { useAuthentication } from "contexts/authenticationContext";
import * as S from "./styles";

function DeleteAccountItem(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.deleteAccountItem",
  });

  const { logoutCurrentUser, signedIn } = useCurrentUser();
  const [emailSentModalVisible, setEmailSentModalVisible] = useState(false);
  const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
    useState(false);
  const { accessToken } = useAuthentication();

  const { sendDeleteAccountEmail } = useUserV1Config();
  const { sendDeleteAccountEmail: sendDeleteAccountEmailNotAuthenticate } =
    useUsers();

  function handleConfirmation() {
    setDeleteAccountModalVisible(true);
  }

  function handleDeleteAccount() {
    logEvent("deleteAccountConfirmBtn_click");
    setEmailSentModalVisible(true);
    setDeleteAccountModalVisible(false);

    if (accessToken && signedIn) {
      sendDeleteAccountEmail();
    } else {
      sendDeleteAccountEmailNotAuthenticate();
    }

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
      <ModalDialog
        visible={emailSentModalVisible}
        title={t("emailSentTitle")}
        description={t("emailSentDescription")}
        type="success"
        icon="check"
        iconColor={theme.colors.brand.primary[600]}
        secondaryButton={{
          text: t("cancelModalButton"),
          onClick: () => setEmailSentModalVisible(false),
        }}
      />
    </S.Container>
  );
}

export default DeleteAccountItem;
