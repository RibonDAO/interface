import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "utils/constants";
import {
  getCookiesItem,
  removeCookiesItem,
  setCookiesItem,
} from "@ribon.io/shared/lib";
import { userAuthenticationApi } from "@ribon.io/shared/services";
import { logError } from "services/crashReport";
import { useCurrentUser } from "contexts/currentUserContext";

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
  signInWithGoogle: (response: any) => void;
  signInWithApple: (response: any) => void;
  isAuthorized: (email: string) => boolean;
  user: any | undefined;
  setUser: (user: any) => void;
  allowed: boolean;
  signInByAuthToken: (signInByAuthTokenProps: authTokenProps) => void;
  sendAuthenticationEmail: (
    sendAuthenticationEmailProps: authenticationEmailProps,
  ) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [user, setUser] = useState<any>();
  const [accessToken, setAccessToken] = useState(
    getCookiesItem(ACCESS_TOKEN_KEY),
  );
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();

  function isAuthorized(email: string) {
    if (!email) return false;
    return email.includes("@ribon.io");
  }

  const allowed = useMemo(() => isAuthorized(user?.email ?? ""), [user]);

  async function signInWithGoogle(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.access_token,
        "google_oauth2_access",
      );

      const token = authResponse.headers["access-token"];
      const refreshToken = authResponse.headers["refresh-token"];
      setCookiesItem(ACCESS_TOKEN_KEY, token);
      setCookiesItem(REFRESH_TOKEN_KEY, refreshToken);
      setAccessToken(token);
      setCurrentUser(authResponse.data.user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  async function signInWithApple(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.authorization.id_token,
        "apple",
      );

      const token = authResponse.headers["access-token"];
      const refreshToken = authResponse.headers["refresh-token"];
      setCookiesItem(ACCESS_TOKEN_KEY, token);
      setCookiesItem(REFRESH_TOKEN_KEY, refreshToken);
      setAccessToken(token);
      setCurrentUser(authResponse.data.user);
    } catch (error) {
      throw new Error("google auth error");
    }
  }

  async function signInByAuthToken({
    authToken,
    id,
    onSuccess,
    onError,
  }: authTokenProps) {
    try {
      setLoading(true);
      const response = await userAuthenticationApi.postAuthorizeFromAuthToken(
        authToken,
        id,
      );
      const token = response.headers["access-token"];
      const refreshToken = response.headers["refresh-token"];

      setCookiesItem(ACCESS_TOKEN_KEY, token);
      setCookiesItem(REFRESH_TOKEN_KEY, refreshToken);
      setAccessToken(token);
      setCurrentUser(response.data.user);

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
      await userAuthenticationApi.postSendAuthenticationEmail(email);
      if (onSuccess) onSuccess();
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
  }

  function logout() {
    removeCookiesItem(ACCESS_TOKEN_KEY);
    removeCookiesItem(REFRESH_TOKEN_KEY);
    setUser(undefined);
    // todo: navigate to public page
  }

  useEffect(() => {
    if (!accessToken) {
      logout();
    }
  }, [accessToken]);

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      user,
      setUser,
      allowed,
      isAuthorized,
      logout,
      accessToken,
      signInWithGoogle,
      signInWithApple,
      signInByAuthToken,
      sendAuthenticationEmail,
      loading,
    }),
    [user, allowed, accessToken, loading],
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