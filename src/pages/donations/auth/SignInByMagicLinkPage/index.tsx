import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import { useAuthentication } from "contexts/authenticationContext";
import Loader from "components/atomics/Loader";
import useNavigation from "hooks/useNavigation";
import { useFirstAccessToIntegration } from "@ribon.io/shared/hooks";
import { INTEGRATION_AUTH_ID } from "utils/constants";

function SignInByMagicLinkPage(): JSX.Element {
  const { search } = useLocation();
  const { navigateTo } = useNavigation();
  const { signInByMagicLink } = useAuthentication();
  const authToken = extractUrlValue("authToken", search) ?? "";
  const id = extractUrlValue("id", search) ?? "";
  const { isFirstAccessToIntegration: isFirstAccessToAuthIntegration } =
    useFirstAccessToIntegration(INTEGRATION_AUTH_ID);

  async function authenticate() {
    if (id && authToken) {
      signInByMagicLink({
        authToken,
        id,
        onSuccess: () => {
          navigateTo("/causes");
        },
        onError: () => {
          navigateTo({
            pathname: "/expired-link",
            state: {
              accountId: id,
            },
          });
        },
      });
    }
  }

  useEffect(() => {
    if (isFirstAccessToAuthIntegration !== undefined) authenticate();
  }, [isFirstAccessToAuthIntegration]);

  return <Loader />;
}

export default SignInByMagicLinkPage;
