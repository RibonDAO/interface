import { createContext, useContext, useMemo, useState } from "react";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "utils/constants";

import { getCookiesItem, setCookiesItem } from "@ribon.io/shared/lib";
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
  email?: string;
  accountId?: string;
  onSuccess?: () => void;
  onError?: () => void;
};
export interface IAuthenticationContext {
  loading: boolean;
  signInWithGoogle: (response: any) => void;
  signInWithApple: (response: any) => void;
  isAuthenticated: () => boolean;
  user: any | undefined;
  setUser: (user: any) => void;
  signInByMagicLink: (signInByMagicLinkProps: authTokenProps) => void;
  sendAuthenticationEmail: (
    sendAuthenticationEmailProps: authenticationEmailProps,
  ) => Promise<string>;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useCurrentUser();
  const emailDoesNotMatchMessage = "Email does not match";

  function isAuthenticated() {
    const token = getCookiesItem(ACCESS_TOKEN_KEY);
    return !!token;
  }

  function signIn(response: any) {
    const token = response.headers["access-token"];
    const refreshToken = response.headers["refresh-token"];

    setCookiesItem(ACCESS_TOKEN_KEY, token);
    setCookiesItem(REFRESH_TOKEN_KEY, refreshToken);
    setCurrentUser(response.data.user);
  }

  async function signInWithGoogle(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.authorization?.id_token || response.access_token,
        "google_oauth2_access",
      );

      signIn(authResponse);
    } catch (error: any) {
      if (error.response) {
        const apiErrorMessage =
          error.response.data.formatted_message === emailDoesNotMatchMessage
            ? emailDoesNotMatchMessage
            : "Unknown error";
        throw new Error(apiErrorMessage);
      }
      throw new Error("google auth error");
    }
  }

  async function signInWithApple(response: any) {
    try {
      const authResponse = await userAuthenticationApi.postAuthenticate(
        response.authorization.id_token,
        "apple",
      );

      signIn(authResponse);
    } catch (error: any) {
      if (error.response) {
        const apiErrorMessage =
          error.response.data.formatted_message === emailDoesNotMatchMessage
            ? emailDoesNotMatchMessage
            : "Unknown error";
        throw new Error(apiErrorMessage);
      }
      throw new Error("apple auth error");
    }
  }

  async function signInByMagicLink({
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

      signIn(response);

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
    accountId,
    onSuccess,
    onError,
  }: authenticationEmailProps) {
    setLoading(true);
    try {
      const response = await userAuthenticationApi.postSendAuthenticationEmail(
        email,
        accountId,
      );
      if (onSuccess) onSuccess();

      setCurrentUser(response.data.user);
      return response.data.user.email;
    } catch (error: any) {
      logError(error);
      if (onError) onError();
    }
    return "";
  }

  const authenticationObject: IAuthenticationContext = useMemo(
    () => ({
      user,
      setUser,
      signInWithGoogle,
      signInWithApple,
      signInByMagicLink,
      sendAuthenticationEmail,
      isAuthenticated,
      loading,
    }),
    [user, loading],
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
