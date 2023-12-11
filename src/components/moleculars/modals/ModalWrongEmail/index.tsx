import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "hooks/useLanguage";
import contactSupport from "lib/contactSupport";
import { logEvent } from "lib/events";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  eventName?: string;
  eventParams?: Record<string, any>;
};

function ModalWrongEmail({
  visible = false,
  setVisible,
  eventName = "P27_emailErrorModal_view",
  eventParams = { from: "validation_flow" },
}: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.modals.ModalWrongEmail",
  });
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();

  const handleSecondaryButton = () => {
    logEvent("supportBtn_click", eventParams);
    contactSupport(currentLang);
  };

  useEffect(() => {
    if (visible === true) {
      logEvent(eventName, eventParams);
    }
  }, [visible]);

  return (
    <ModalDialog
      visible={visible}
      title={t("title")}
      description={t("description", {
        email: currentUser?.email,
      })}
      primaryButton={{
        text: t("tryAgain"),
        onClick: () => {
          setVisible(false);
        },
      }}
      secondaryButton={{
        text: t("contactSupport"),
        onClick: () => {
          handleSecondaryButton();
        },
      }}
      onClose={() => setVisible(false)}
    />
  );
}

export default ModalWrongEmail;
