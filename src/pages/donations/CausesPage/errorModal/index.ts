import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { LocationStateType } from "../LocationStateType";

export default function showErrorModal(state: LocationStateType) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { navigateTo } = useNavigation();

  const { hide: closeWarningModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_DIALOG,
      props: {
        title: t("errorModalTitle"),
        description: state?.message || t("errorModalText"),
        primaryButton: {
          text: t("errorModalButtonText"),
          onClick: () => closeWarningModal(),
        },
        onClose: () => closeWarningModal(),
        eventName: "P12_errorModal",
        supportButton: true,
        type: "error",
      },
    },
    state?.failedDonation,
  );

  const { hide: closeUnauthorizedModal } = useModal(
    {
      type: MODAL_TYPES.MODAL_DIALOG,
      props: {
        title: t("unauthorizedModalTitle"),
        description: t("unauthorizedModalText"),
        primaryButton: {
          text: t("unauthorizedModalButtonText"),
          onClick: () => {
            closeUnauthorizedModal();
            navigateTo("validate-account");
          },
        },
        onClose: () => closeUnauthorizedModal(),
        eventName: "P12_unauthorizedModal",
        supportButton: false,
        type: "error",
      },
    },
    state?.unauthorizedDonation,
  );
}
