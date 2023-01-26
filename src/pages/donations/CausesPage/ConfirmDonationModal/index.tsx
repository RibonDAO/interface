import { useCallback } from "react";
import UserIcon from "assets/icons/user-mono-icon.svg";
import Ticket from "assets/icons/ticket-rounded-icon.svg";
import ModalIcon from "components/moleculars/modals/ModalIcon";
import ModalAnimation from "components/moleculars/modals/ModalAnimation";
import { useTranslation } from "react-i18next";
import NonProfit from "types/entities/NonProfit";
import { useCurrentUser } from "contexts/currentUserContext";
import { impactNormalizer } from "@ribon.io/shared/lib";

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

  const { t: normalizerTranslation } = useTranslation("translation", {
    keyPrefix: "impactNormalizer",
  });

  const { currentUser } = useCurrentUser();

  const closeConfirmModal = useCallback(() => {
    setConfirmModalVisible(false);
  }, []);

  // TODO: Remove this fallback when all nonProfits are using the new impact
  const formattedImpactText = (nonProfit: NonProfit) => {
    if (!nonProfit) return "";

    const impacts = nonProfit?.nonProfitImpacts || [];
    const nonProfitsImpactsLength = impacts.length;
    const roundedImpact = nonProfit?.impactByTicket;

    if (roundedImpact && impacts && nonProfitsImpactsLength) {
      const lastImpact = impacts[nonProfitsImpactsLength - 1];
      if (lastImpact.donorRecipient) {
        const normalizedImpact = impactNormalizer(
          nonProfit,
          roundedImpact,
          normalizerTranslation,
        );

        return normalizedImpact.join(" ");
      }
    }

    return `${chosenNonProfit?.impactByTicket} ${chosenNonProfit?.impactDescription}`;
  };

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
