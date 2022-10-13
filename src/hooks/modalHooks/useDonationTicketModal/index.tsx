import { useTranslation } from "react-i18next";
import { useAnimationReceiveTicketModal } from "hooks/modalHooks/useAnimationReceiveTicketModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import Integration from "types/entities/Integration";
import { RIBON_COMPANY_ID } from "utils/constants";
import RibonIcon from "assets/icons/logo-background-icon.svg";
import { useModal } from "../useModal";

export function useDonationTicketModal(
  initialState?: boolean,
  integration?: Integration,
) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { showAnimationReceiveTicketModal } = useAnimationReceiveTicketModal();

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  const modalDoubleImageProps = {
    title: t("donationWithIntegrationModalTitle"),
    body: t("donationWithIntegrationModalSubtitle"),
    primaryButtonText: t("donationWithIntegrationModalButtonText"),
    primaryButtonCallback: () => {
      showAnimationReceiveTicketModal();
    },
    onClose: () => showAnimationReceiveTicketModal(),
    leftImage: !isRibonIntegration ? integration?.logo : null,
    rightImage: RibonIcon,
  };

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_DOUBLE_IMAGE,
    props: modalDoubleImageProps,
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
