import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "hooks/useLanguage";
import contactSupport from "lib/contactSupport";
import { logEvent } from "lib/events";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

type Props = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
};

function ModalWrongEmail({ visible = false, setVisible }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.moleculars.modals.ModalWrongEmail",
  });
  const { currentLang } = useLanguage();
  const { currentUser } = useCurrentUser();

  const handleSecondaryButton = () => {
    logEvent("supportBtn_click", {
      from: "validation_flow",
    });
    contactSupport(currentLang);
  };

  useEffect(() => {
    logEvent("P27_emailErrorModal_view", {
      from: "validation_flow",
    });
  }, []);

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
