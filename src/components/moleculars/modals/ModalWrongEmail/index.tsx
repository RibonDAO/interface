import ModalDialog from "components/moleculars/modals/ModalDialog";
import { useCurrentUser } from "contexts/currentUserContext";
import { useLanguage } from "hooks/useLanguage";
import contactSupport from "lib/contactSupport";
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
          contactSupport(currentLang);
        },
      }}
      onClose={() => setVisible(false)}
    />
  );
}

export default ModalWrongEmail;
