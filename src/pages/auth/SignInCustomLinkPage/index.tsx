import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCurrentUser } from "contexts/currentUserContext";
import useToast from "hooks/useToast";
import { useAuthentication } from "contexts/authenticationContext";
import ValidateAccount from "components/moleculars/validateAccount";

function SignInCustomLinkPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInCustomLinkPage",
  });
  const { currentUser } = useCurrentUser();
  const { navigateTo } = useNavigation();
  const { sendAuthenticationEmail } = useAuthentication();
  const toast = useToast();

  useEffect(() => {
    logEvent("P27_view", {
      from: "validation_flow",
    });
  }, []);

  const onContinue = async (pathname: string) => {
    navigateTo({
      pathname,
    });
    toast({
      message: t("toastDescription"),
      type: "success",
    });
  };

  const onContinueMagicLink = (pathname: string) => {
    sendAuthenticationEmail({ email: currentUser?.email });
    navigateTo({
      pathname,
      state: { email: currentUser?.email },
    });
  };

  useAvoidBackButton();

  return (
    <ValidateAccount
      title={t("title")}
      description={t("description")}
      onContinue={() => onContinue("/custom-link")}
      onContinueMagicLink={() =>
        onContinueMagicLink("/auth/sent-magic-link-email")
      }
      hideMagicLink
    />
  );
}

export default SignInCustomLinkPage;
