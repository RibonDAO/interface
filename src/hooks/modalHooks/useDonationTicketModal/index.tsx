import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import Ticket from "assets/images/ticket.svg";
import { useModal } from "../useModal";

export function useDonationTicketModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("donationModalTitle"),
      body: t("donationModalBody"),
      primaryButtonText: t("donationModalButtonText"),
      primaryButtonCallback: () => {
        hide();
      },
      onClose: () => hide(),
      icon: Ticket,
    },
  });

  const showDonationTicketModal = () => {
    show();
  };

  const hideDonationTicketModal = () => {
    hide();
  };

  useEffect(() => {
    if (initialState) showDonationTicketModal();
  }, []);

  return { showDonationTicketModal, hideDonationTicketModal };
}
