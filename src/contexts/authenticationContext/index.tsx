import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "utils/constants";
import { getCookiesItem, removeCookiesItem, setCookiesItem } from "@ribon.io/shared/lib";
import authApi from "services/api/authApi";
import { logError } from "services/crashReport";

// todo: create goggle, apple and magic link login
type authTokenProps = {
  authToken: string;
  id: string;
  onSuccess?: () => void;
  onError?: () => void;
};

type authenticationEmailProps = {
  email: string;
  onSuccess?: () => void;
  onError?: () => void;
};
export interface IAuthenticationContext {
  accessToken: string | null;
  loading: boolean;
  logout: () => void;
  signInByAuthToken: (signInByAuthTokenProps: authTokenProps) => void;
  sendAuthenticationEmail: (sendAuthenticationEmailProps: authenticationEmailProps) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [accessToken, setAccessToken] = useState(getCookiesItem(ACCESS_TOKEN_KEY));
  const [loading, setLoading] = useState(false);

  async function signInByAuthToken({
    authToken,
    id,
    onSuccess,
    onError,
  }: authTokenProps) {
    setLoading(true);
    try {
      const response = await authApi.postAuthorizeFromAuthToken(authToken, id);
      const token = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];

      setCookiesItem(ACCESS_TOKEN_KEY, token);
      setCookiesItem(REFRESH_TOKEN_KEY, refreshToken);
      setAccessToken(token);

      if (onSuccess) onSuccess();
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    } finally {
      setLoading(false);
    }
  }

  async function sendAuthenticationEmail({
    email,
    onSuccess,
    onError,
  }: authenticationEmailProps) {
    setLoading(true);
    try {
      await authApi.sendAuthenticationEmail(email);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
  }

  function logout() {
    removeCookiesItem(ACCESS_TOKEN_KEY);
    removeCookiesItem(REFRESH_TOKEN_KEY);
    // todo: navigate to public page
  }

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken]);

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      logout,
      signInByAuthToken,
      sendAuthenticationEmail,
      accessToken,
      loading,
    }),
    [accessToken, loading],
  );

  return (
    <AuthenticationContext.Provider value={authenticationObject}>
      {children}
    </AuthenticationContext.Provider>
  );
}

export default AuthenticationProvider;

export const useAuthentication = () => {
  const context = useContext(AuthenticationContext);

  if (!context) {
    throw new Error(
      "useAuthentication must be used within AuthenticationProvider",
    );
  }

  return context;
};
