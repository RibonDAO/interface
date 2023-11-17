import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import { useAuthentication } from "contexts/authenticationContext";
import Loader from "components/atomics/Loader";
import ReceiveExtraTicketPage from "pages/donations/auth/ReceiveExtraTicketPage";
import useNavigation from "hooks/useNavigation";

function SignInByAuthToken(): JSX.Element {
  const { search } = useLocation();
  const { signInByAuthToken, loading } = useAuthentication();
  const { navigateTo } = useNavigation();

  useEffect(() => {
    async function authenticate() {
      const authToken = extractUrlValue("authToken", search);
      const id = extractUrlValue("id", search);

      if (id && authToken) {
        signInByAuthToken({
          authToken,
          id,
        });
      } else {
        navigateTo("/expired-link");
      }
    }

    authenticate();
  }, []);

  return loading ? <Loader /> : <ReceiveExtraTicketPage />;
}

export default SignInByAuthToken;
