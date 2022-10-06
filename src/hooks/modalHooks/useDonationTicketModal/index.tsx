import { useTranslation } from "react-i18next";
import { useAnimationReceiveTicketModal } from "hooks/modalHooks/useAnimationReceiveTicketModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import Ticket from "assets/images/ticket.svg";
import Integration from "types/entities/Integration";
import RibonIcon from "assets/icons/logo-background-icon.svg";
import { useModal } from "../useModal";

export function useDonationTicketModal(initialState?: boolean, integration?: Integration) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { showAnimationReceiveTicketModal } = useAnimationReceiveTicketModal();

  const modalDoubleImageProps = {
    title: t("donationWithIntegrationModalTitle"),
    body: t("donationWithIntegrationModalSubtitle"),
    primaryButtonText: t("donationWithIntegrationModalButtonText"),
    primaryButtonCallback: () => {
      showAnimationReceiveTicketModal();
    },
    onClose: () => showAnimationReceiveTicketModal(),
    leftImage: integration?.logo,
    rightImage: RibonIcon,
  }

  const modalIconProps = {
    title: t("donationModalTitle"),
    primaryButtonText: t("donationModalButtonText"),
    primaryButtonCallback: () => {
      showAnimationReceiveTicketModal();
    },
    onClose: () => showAnimationReceiveTicketModal(),
    icon: Ticket,
  }

  const { show, hide } = useModal({
    type: integration ? MODAL_TYPES.MODAL_DOUBLE_IMAGE : MODAL_TYPES.MODAL_ICON,
    props: integration ? modalDoubleImageProps : modalIconProps,
  });

  const showDonationTicketModal = () => {
    show();
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
