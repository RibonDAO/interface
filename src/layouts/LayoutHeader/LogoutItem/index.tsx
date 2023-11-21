import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";

import CardIconText from "components/moleculars/cards/CardIconText";
import letterIcon from "assets/icons/letter-icon.svg";
import theme from "styles/theme";
import ModalDialog from "components/moleculars/modals/ModalDialog";
import { logEvent } from "lib/events";
import * as S from "./styles";

type Props = {
  closeMenu: () => void;
};

function LogoutItem({ closeMenu }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.logoutItem",
  });
  const { tertiary } = theme.colors.brand;

  const { logoutCurrentUser, currentUser } = useCurrentUser();
  const [email, setEmail] = useState("");
  const [warningModalVisible, setWarningModalVisible] = useState(false);
  const { navigateTo } = useNavigation();
  const { createVoucher } = useVoucher();

  const handleLogout = () => {
    logEvent("signoutConfirmBtn_click");
    logoutCurrentUser();
    createVoucher();
    navigateTo("/causes");
    window.location.reload();
  };

  const showModal = () => {
    setWarningModalVisible(true);
    logEvent("signoutBtn_click");
  };

  const closeModal = () => {
    setWarningModalVisible(false);
    closeMenu();
  };

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
            onClick={showModal}
            textColor={tertiary[400]}
            borderColor={tertiary[400]}
            round
          />
        }
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
      />
    </S.Container>
  );
}

export default LogoutItem;
