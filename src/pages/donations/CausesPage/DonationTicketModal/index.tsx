import { useCallback, useEffect, useState } from "react";
import Ticket from "assets/images/ticket.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import { useTranslation } from "react-i18next";
import { today } from "lib/dateTodayFormatter";
import { logEvent } from "services/analytics";
import { useLocation } from "react-router-dom";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { DONATION_MODAL_SEEN_AT_KEY } from "lib/localStorage/constants";
import { useCurrentUser } from "contexts/currentUserContext";

type LocationStateType = {
  blockedDonation: boolean;
};

function DonationTicketModal(): JSX.Element {
  const hasNotSeenDonationModal = !getLocalStorageItem(
    DONATION_MODAL_SEEN_AT_KEY,
  );

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { state } = useLocation<LocationStateType>();
  const [donationModalVisible, setDonationModalVisible] = useState(
    !state?.blockedDonation && hasNotSeenDonationModal,
  );
  const { userLastDonation } = useCurrentUser();

  useEffect(() => {
    logEvent("donateIntroDial_view");
    if (hasNotSeenDonationModal)
      setLocalStorageItem(DONATION_MODAL_SEEN_AT_KEY, Date.now().toString());
  }, []);

  const closeDonationModal = useCallback(() => {
    setDonationModalVisible(false);
  }, []);

  function hasDonateToday() {
    return userLastDonation === today();
  }

  return (
    <ModalIcon
      icon={Ticket}
      title={t("donationModalTitle")}
      body={t("donationModalBody")}
      primaryButtonText={t("donationModalButtonText")}
      visible={donationModalVisible && !hasDonateToday()}
      onClose={closeDonationModal}
      primaryButtonCallback={closeDonationModal}
    />
  );
}

export default DonationTicketModal;
