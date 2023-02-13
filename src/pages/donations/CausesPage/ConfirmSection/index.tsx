import Ticket from "assets/images/ticket.svg";
import { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useDonations } from "@ribon.io/shared/hooks";
import { useCurrentUser, SHOW_MENU } from "contexts/currentUserContext";
import { logError } from "services/crashReport";
import { setLocalStorageItem } from "lib/localStorage";
import useVoucher from "hooks/useVoucher";
import useNavigation from "hooks/useNavigation";
import { NonProfit, Integration } from "@ribon.io/shared/types";
import extractUrlValue from "lib/extractUrlValue";
import ConfirmEmail from "../ConfirmEmail";
import ConfirmDonationModal from "../ConfirmDonationModal";

type Props = {
  chosenNonProfit: NonProfit;
  integration: Integration;
  donateTicket: (email: string) => void;
  confirmModalVisible: boolean;
  donationInProcessModalVisible: boolean;
  setConfirmModalVisible: (visible: boolean) => void;
  setDonationInProcessModalVisible: (visible: boolean) => void;
  closeConfirmModal: () => void;
};
function ConfirmSection({
  chosenNonProfit,
  integration,
  donateTicket,
  confirmModalVisible,
  donationInProcessModalVisible,
  setConfirmModalVisible,
  setDonationInProcessModalVisible,
  closeConfirmModal,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { navigateTo } = useNavigation();
  const { signedIn, currentUser } = useCurrentUser();
  const { donate } = useDonations(currentUser?.id);
  const { destroyVoucher } = useVoucher();
  const { history } = useNavigation();

  function getExternalIdFromLocationSearch() {
    return extractUrlValue("external_id", history.location.search);
  }

  async function handleDonate(email: string) {
    setDonationInProcessModalVisible(false);
    if (integration && chosenNonProfit) {
      try {
        await donate(
          integration?.id,
          chosenNonProfit.id,
          email,
          getExternalIdFromLocationSearch(),
        );
        destroyVoucher();
        navigateTo({
          pathname: "/donation-done-cause",
          state: {
            cause: chosenNonProfit.cause,
            nonProfit: chosenNonProfit,
            flow: "cause",
          },
        });
      } catch (e: any) {
        const failedKey =
          e.response.status === 403 ? "blockedDonation" : "failedDonation";
        const newState = {
          [failedKey]: true,
          message: e.response.data?.formatted_message,
        };
        navigateTo({ pathname: "/", state: newState });
        window.location.reload();
        logError(e);
      }
      setLocalStorageItem(SHOW_MENU, "true");
    }
  }

  const handleSignedInDonation = useCallback(async (email: string) => {
    setConfirmModalVisible(false);
    setDonationInProcessModalVisible(true);
    setTimeout(async () => {
      await handleDonate(email);
    }, 3000);
  }, []);

  return signedIn ? (
    <ConfirmDonationModal
      donate={handleSignedInDonation}
      chosenNonProfit={chosenNonProfit}
      confirmModalVisible={confirmModalVisible}
      donationInProcessModalVisible={donationInProcessModalVisible}
      setConfirmModalVisible={setConfirmModalVisible}
    />
  ) : (
    <ConfirmEmail
      onFormSubmit={(values) => {
        donateTicket(values.email);
        handleSignedInDonation(values.email);
      }}
      visible={confirmModalVisible}
      icon={Ticket}
      title={t("confirmModalTitle")}
      primaryButton={{ text: t("confirmModalPrimaryButtonText") }}
      secondaryButton={{
        text: t("confirmModalSecondaryButtonText"),
        onClick: closeConfirmModal,
      }}
    />
  );
}

export default ConfirmSection;
