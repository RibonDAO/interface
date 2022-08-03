import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import useNavigation from "hooks/useNavigation";
import blockedIcon from "assets/images/il-ticket-gray.svg";
import { useEffect } from "react";
import { logEvent } from "services/analytics";
import { useModal } from "../useModal";

export function useBlockedDonationModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo } = useNavigation();

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("blockedModalTitle"),
      body: t("blockedModalText"),
      primaryButtonText: t("blockedModalFirstButtonText"),
      primaryButtonCallback: () => {
        logEvent("fundExternalCtaBtn_click");
        hide();
        navigateTo("/promoters/fund");
      },
      secondaryButtonCallback: () => hide(),
      secondaryButtonText: t("blockedModalSecondButtonText"),
      onClose: () => hide(),
      icon: blockedIcon,
    },
  });

  const showBlockedDonationModal = () => {
    show();
  };

  const hideBlockedDonationModal = () => {
    hide();
  };

  useEffect(() => {
    if (initialState) showBlockedDonationModal();
  }, []);

  return { showBlockedDonationModal, hideBlockedDonationModal };
}
