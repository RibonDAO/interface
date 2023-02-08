import { useCallback, useEffect } from "react";
import UserIcon from "assets/icons/user-mono-icon.svg";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import ModalAnimation from "components/moleculars/modals/ModalAnimation";
import { useTranslation } from "react-i18next";
import NonProfit from "types/entities/NonProfit";
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
    />
  ) : (
    <ModalIcon
      icon={Ticket}
      title={t("confirmModalAuthTitle")}
      body={formattedImpactText(chosenNonProfit)}
      primaryButtonText={t("confirmModalPrimaryButtonText")}
      primaryButtonCallback={() => {
        if (currentUser) donate(currentUser.email);
      }}
      secondaryButtonText={t("confirmModalSecondaryButtonText")}
      secondaryButtonCallback={closeConfirmModal}
      visible={confirmModalVisible}
      onClose={closeConfirmModal}
      roundIcon
    />
  );
}

export default ConfirmDonationModal;
