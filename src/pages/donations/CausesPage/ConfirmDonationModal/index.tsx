import { useCallback, useEffect } from "react";
import UserIcon from "assets/icons/user-mono-icon.svg";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import ModalAnimation from "components/moleculars/modals/ModalAnimation";
import { useTranslation } from "react-i18next";
import { NonProfit } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";
import useFormattedImpactText from "hooks/useFormattedImpactText";
import DonationDoneSound from "assets/sounds/donation-done.mp3";
import { fetchAudioAndSaveToStorage } from "lib/cachedAudio";

type Props = {
  donate: (email: string) => void;
  chosenNonProfit: NonProfit;
  confirmModalVisible: boolean;
  donationInProcessModalVisible: boolean;
  setConfirmModalVisible: (visible: boolean) => void;
};
function ConfirmDonationModal({
  donate,
  chosenNonProfit,
  confirmModalVisible,
  donationInProcessModalVisible,
  setConfirmModalVisible,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { currentUser } = useCurrentUser();
  const { formattedImpactText } = useFormattedImpactText();

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  useEffect(() => {
    fetchAudioAndSaveToStorage(DonationDoneSound, "donationDoneSound");
  }, []);

  return donationInProcessModalVisible ? (
    <ModalAnimation
      text={t("donateAnimationModalTitle")}
      iconOrigin={UserIcon}
      textOrigin={t("donateAnimationModalOrigin")}
      iconDestiny={chosenNonProfit?.logo}
      textDestiny={t("donateAnimationModalDestiny")}
      icon={Ticket}
      visible={donationInProcessModalVisible}
      isIconDestinyFullSize
      eventName="P1_donateProgressModal"
      eventParams={{ nonProfitId: chosenNonProfit?.id }}
    />
  ) : (
    <ModalIcon
      icon={Ticket}
      title={t("confirmModalAuthTitle")}
      body={formattedImpactText(chosenNonProfit)}
      primaryButton={{
        text: t("confirmModalPrimaryButtonText"),
        onClick: () => {
          if (currentUser) donate(currentUser.email);
        },
        eventName: "P1_donateConfirmBtn",
      }}
      secondaryButton={{
        text: t("confirmModalSecondaryButtonText"),
        onClick: closeConfirmModal,
      }}
      visible={confirmModalVisible}
      onClose={closeConfirmModal}
      roundIcon
      eventName="P1_donateConfirmModal"
    />
  );
}

export default ConfirmDonationModal;
