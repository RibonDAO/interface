import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import useVoucher from "hooks/useVoucher";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import SupportersIcon from "assets/icons/community-icon.svg";
import UserIcon from "assets/icons/user-mono-icon.svg";
import { useCausesContext } from "contexts/causesContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { isFirstAccess } from "lib/onboardingFirstAccess";
import { useModal } from "../useModal";

// This hook is not used in the project since the receive ticket modal was changed to a toast.
export function useAnimationReceiveTicketModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { createVoucher } = useVoucher();
  const { signedIn } = useCurrentUser();
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
      eventName: "P1_dailyTicketModal",
    },
  });

  const hideAnimationReceiveTicketModal = () => {
    hide();
    if (isFirstAccess(signedIn)) setChooseCauseModalVisible(true);
  };

  const showAnimationReceiveTicketModal = () => {
    show();
    setTimeout(() => {
      createVoucher();
      hideAnimationReceiveTicketModal();
    }, 3000);
  };

  useEffect(() => {
    if (initialState) showAnimationReceiveTicketModal();
  }, [chooseCauseModalVisible]);

  return { showAnimationReceiveTicketModal };
}
