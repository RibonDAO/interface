import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useVoucher from "hooks/useVoucher";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/community-icon.svg";
import UserIcon from "assets/icons/user-mono-icon.svg";
import { logEvent } from "services/analytics";
import { useCausesContext } from "contexts/causesContext";
import { useModal } from "../useModal";

export function useAnimationReceiveTicketModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { createVoucher } = useVoucher();
  const { chooseCauseModalVisible, setChooseCauseModalVisible } =
    useCausesContext();

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ANIMATION,
    props: {
      text: t("receiveTicketAnimationModalTitle"),
      iconOrigin: SupportersIcon,
      textOrigin: t("receiveTicketAnimationModalOrigin"),
      iconDestiny: UserIcon,
      textDestiny: t("receiveTicketAnimationModalDestiny"),
      icon: Ticket,
    },
  });

  const hideAnimationReceiveTicketModal = () => {
    hide();
    setChooseCauseModalVisible(true);
  };

  const showAnimationReceiveTicketModal = () => {
    show();
    setTimeout(() => {
      logEvent("dailyTicketDial_view");
      createVoucher();
      hideAnimationReceiveTicketModal();
    }, 3000);
  };

  useEffect(() => {
    if (initialState) showAnimationReceiveTicketModal();
  }, [chooseCauseModalVisible]);

  return { showAnimationReceiveTicketModal };
}
