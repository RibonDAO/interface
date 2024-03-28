import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  onClose: () => void;
  sendCancelEmail: () => void;
};

export function CancelSubscriptionModal({
  visible,
  onClose,
  sendCancelEmail,
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.subscriptionsPage.cancelSubscriptionModal",
  });

  return (
    <ModalDialog
      title={t("title")}
      visible={visible}
      eventName="cancelSubsModal_view"
      description={t("description")}
      primaryButton={{
        text: t("primaryButton"),
        onClick: sendCancelEmail,
        eventName: "cancelSubsBtn_click",
      }}
      secondaryButton={{ text: t("secondaryButton"), onClick: onClose }}
      icon="delete_forever"
      type="error"
      onClose={onClose}
    />
  );
}

export default CancelSubscriptionModal;
