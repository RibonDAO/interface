import { useTranslation } from "react-i18next";
import { useAnimationReceiveTicketModal } from "hooks/modalHooks/useAnimationReceiveTicketModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import Ticket from "assets/images/ticket.svg";
import { logEvent } from "services/analytics";
import { useModal } from "../useModal";

export function useDonationTicketModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { showAnimationReceiveTicketModal } = useAnimationReceiveTicketModal();

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("donationModalTitle"),
      primaryButtonText: t("donationModalButtonText"),
      primaryButtonCallback: () => {
        showAnimationReceiveTicketModal();
      },
      onClose: () => showAnimationReceiveTicketModal(),
      icon: Ticket,
    },
  });

  const showDonationTicketModal = () => {
    show();
    logEvent("dailyTicketDial_view");
  };

  const hideDonationTicketModal = () => {
    hide();
    showAnimationReceiveTicketModal();
  };

  useEffect(() => {
    if (initialState) showDonationTicketModal();
  }, []);

  return { showDonationTicketModal, hideDonationTicketModal };
}
