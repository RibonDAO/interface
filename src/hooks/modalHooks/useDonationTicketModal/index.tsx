import { useTranslation } from "react-i18next";
import { useAnimationReceiveTicketModal } from "hooks/modalHooks/useAnimationReceiveTicketModal";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import { Integration } from "@ribon.io/shared/types";
import { RIBON_COMPANY_ID } from "utils/constants";
import RibonIcon from "assets/icons/logo-background-icon.svg";
import { useModal } from "../useModal";

// This hook is not used in the project since the receive ticket modal was changed to a toast.
export function useDonationTicketModal(
  initialState?: boolean,
  integration?: Integration,
) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { showAnimationReceiveTicketModal } = useAnimationReceiveTicketModal();

  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  const modalTitle = isRibonIntegration
    ? t("donationWithRibonModalTitle")
    : t("donationWithIntegrationModalTitle", {
        integrationName: integration?.name,
      });

  const modalDoubleImageProps = {
    title: modalTitle,
    body: t("donationWithIntegrationModalSubtitle"),
    primaryButton: {
      text: t("donationWithIntegrationModalButtonText"),
      onClick: () => {
        showAnimationReceiveTicketModal();
      },
      eventName: "P1_IntroModal",
    },
    onClose: () => showAnimationReceiveTicketModal(),
    leftImage: !isRibonIntegration ? integration?.logo : null,
    rightImage: RibonIcon,
    eventName: "P1_IntroModal",
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
    if (initialState && integration) showDonationTicketModal();
  }, []);

  return { showDonationTicketModal, hideDonationTicketModal };
}
