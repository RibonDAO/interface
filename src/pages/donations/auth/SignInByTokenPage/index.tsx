import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import { useAuthentication } from "contexts/authenticationContext";
import Loader from "components/atomics/Loader";
import ReceiveExtraTicketPage from "pages/donations/auth/ReceiveExtraTicketPage";

function SignInByAuthToken(): JSX.Element {
  const { search } = useLocation();
  const { signInByAuthToken, loading } = useAuthentication();

  useEffect(() => {
    async function authenticate() {
      const authToken = extractUrlValue("authToken", search);
      const id = extractUrlValue("id", search);

      if (id && authToken) {
        signInByAuthToken({
          authToken,
          id,
        });
      }
    }

    authenticate();
  }, []);

  return loading ? <Loader /> : <ReceiveExtraTicketPage />;
}

export default SignInByAuthToken;
