import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import useAvoidBackButton from "hooks/useAvoidBackButton";
import { useCurrentUser } from "contexts/currentUserContext";
import { userAccountApi } from "@ribon.io/shared/services";
import useToast from "hooks/useToast";
import { useAuthentication } from "contexts/authenticationContext";
import ValidateAccount from "components/moleculars/validateAccount";

function SignInExtraTicketPage(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "donations.auth.signInExtraTicketPage",
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
    await userAccountApi.postSendValidatedEmail();
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
      description={t("description", { email: currentUser?.email })}
      onContinue={() => onContinue("/")}
      onContinueMagicLink={() =>
        onContinueMagicLink("/auth/sent-magic-link-email")
      }
    />
  );
}

export default SignInExtraTicketPage;
