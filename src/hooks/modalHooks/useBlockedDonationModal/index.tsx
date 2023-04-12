import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import blockedIcon from "assets/icons/ticket-off.svg";
import giftIcon from "assets/icons/gift-ribon.svg";
import { useEffect } from "react";
import { Integration } from "@ribon.io/shared/types";
import TicketWithTextAndImage from "components/atomics/TicketWithTextAndImage";
import { RIBON_COMPANY_ID } from "utils/constants";
import { useModal } from "../useModal";

export function useBlockedDonationModal(
  initialState?: boolean,
  integration?: Integration,
) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage.blockedModal",
  });
  const isRibonIntegration = integration?.id === parseInt(RIBON_COMPANY_ID, 10);

  function renderTickets() {
    return isRibonIntegration || !integration?.integrationTask
      ? [
          <TicketWithTextAndImage
            title={t("ribonTitle")}
            subtitle={t("ribonText")}
            image={giftIcon}
          />,
        ]
      : [
          <TicketWithTextAndImage
            title={integration?.integrationTask.description}
            subtitle={integration?.integrationTask.link}
            image={integration?.logo}
            link={integration?.integrationTask.linkAddress}
            eventName="ticketModalWinBtn"
            eventParams={{ ticketQtd: 0 }}
          />,
          <TicketWithTextAndImage
            title={t("ribonTitle")}
            subtitle={t("ribonText")}
            image={giftIcon}
          />,
        ];
  }

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ROWS,
    props: {
      title: t("title"),
      body: t("text"),
      children: renderTickets(),
      onClose: () => hide(),
      icon: blockedIcon,
      eventName: "noTicketModal",
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
