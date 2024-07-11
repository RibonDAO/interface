import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useEffect } from "react";
import GoogleLogin from "components/moleculars/buttons/GoogleLogin";
import AppleLogin from "components/moleculars/buttons/AppleLogin";
import MagicLinkLogin from "components/moleculars/buttons/MagicLinkLogin";
import { useCurrentUser } from "contexts/currentUserContext";
import useNavigation from "hooks/useNavigation";
import { useModal } from "../useModal";

export function useUnauthorizedContributionModal(initialState?: boolean) {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });
  const { navigateTo, history } = useNavigation();
  const { currentUser } = useCurrentUser();

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_DIALOG,
    props: {
      title: t("unauthorizedModalTitle"),
      description: t("unauthorizedModalText", { email: currentUser?.email }),
      children: (
        <>
          <GoogleLogin
            onContinue={() => {
              hide();
              navigateTo("/");
            }}
            from="/causes"
          />
          <AppleLogin
            onContinue={() => {
              hide();
              navigateTo("/");
            }}
            from="/causes"
          />
          <MagicLinkLogin
            onContinue={() => {
              hide();
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
      onClose: () => hide(),
      eventName: "P12_unauthorizedModal",
      type: "success",
    },
  });

  const showUnauthorizedContributionModal = () => {
    show();
  };

  const hideUnauthorizedContributionModal = () => {
    hide();
  };

  useEffect(() => {
    if (initialState) showUnauthorizedContributionModal();
  }, []);

  return {
    showUnauthorizedContributionModal,
    hideUnauthorizedContributionModal,
  };
}
