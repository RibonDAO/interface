import Ticket from "assets/images/ticket.svg";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import NonProfit from "types/entities/NonProfit";
import ConfirmEmail from "../ConfirmEmail";
import ConfirmDonationModal from "../ConfirmDonationModal";

type Props = {
  chosenNonProfit: NonProfit;
  donate: (email: string) => void;
  confirmModalVisible: boolean;
  setConfirmModalVisible: (visible: boolean) => void;
  closeConfirmModal: () => void;
};
function ConfirmSection({
  chosenNonProfit,
  donate,
  confirmModalVisible,
  setConfirmModalVisible,
  closeConfirmModal,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { signedIn } = useCurrentUser();

  return signedIn ? (
    <ConfirmDonationModal
      donate={donate}
      chosenNonProfit={chosenNonProfit}
      confirmModalVisible={confirmModalVisible}
      setConfirmModalVisible={setConfirmModalVisible}
    />
  ) : (
    <ConfirmEmail
      onFormSubmit={(values) => {
        donate(values.email);
      }}
      visible={confirmModalVisible}
      icon={Ticket}
      title={t("confirmModalTitle")}
      primaryButtonText={t("confirmModalPrimaryButtonText")}
      secondaryButtonText={t("confirmModalSecondaryButtonText")}
      secondaryButtonCallback={closeConfirmModal}
    />
  );
}

export default ConfirmSection;
