import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useModal } from "hooks/modalHooks/useModal";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import { LocationStateType } from "../LocationStateType";

export default function showErrorModal(state: LocationStateType) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { navigateTo, history } = useNavigation();
  const { currentUser } = useCurrentUser();

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
        description: t("unauthorizedModalText", { email: currentUser?.email }),
        children: (
          <>
            <GoogleLogin
              onContinue={() => {
                closeUnauthorizedModal();
                navigateTo("/");
              }}
              from="/causes"
            />
            <AppleLogin
              onContinue={() => {
                closeUnauthorizedModal();
                navigateTo("/");
              }}
              from="/causes"
            />
            <MagicLinkLogin
              onContinue={() => {
                closeUnauthorizedModal();
                history.replace("/causes", {});
                navigateTo({
                  pathname: "/auth/sent-magic-link-email",
                  state: {
                    email: currentUser?.email,
                  },
                });
              }}
              from="/causes"
            />
          </>
        ),
        onClose: () => closeUnauthorizedModal(),
        eventName: "P12_unauthorizedModal",
        type: "success",
      },
    },
    state?.unauthorizedDonation,
  );
}
