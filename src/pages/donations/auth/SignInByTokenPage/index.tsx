import { useEffect } from "react";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router";
import { useAuthentication } from "contexts/authenticationContext";
import Loader from "components/atomics/Loader";
import ReceiveExtraTicketPage from "pages/donations/auth/ReceiveExtraTicketPage";

function SignInByMagicLink(): JSX.Element {
  const { search } = useLocation();
  const { signInByMagicLink, loading } = useAuthentication();

  useEffect(() => {
    async function authenticate() {
      const authToken = extractUrlValue("authToken", search);
      const id = extractUrlValue("id", search);

      if (id && authToken) {
        signInByMagicLink({
          authToken,
          id,
        });
      }
    }

    authenticate();
  }, []);

  return loading ? <Loader /> : <ReceiveExtraTicketPage />;
}

export default SignInByMagicLink;
