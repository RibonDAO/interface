import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import blockedIcon from "assets/icons/ticket-off.svg";
import { useEffect } from "react";
import TicketWithTextAndImage from "components/atomics/TicketWithTextAndImage";
import { useModal } from "../useModal";

export function useBlockedDonationModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ROWS,
    props: {
      title: t("blockedModalTitle"),
      body: t("blockedModalText"),
      children: [
        <TicketWithTextAndImage
          title="Realize outra compra"
          subtitle="Volte amanhã para receber mais 1 vale"
          image="https://cdn.worldvectorlogo.com/logos/renner-1.svg"
        />,
        <TicketWithTextAndImage
          title="Realize outra compra"
          subtitle="Volte amanhã para receber mais 1 vale"
          image="https://cdn.worldvectorlogo.com/logos/renner-1.svg"
        />,
      ],
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
