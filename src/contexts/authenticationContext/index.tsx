import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "utils/constants";
import {
  getCookiesItem,
  removeCookiesItem,
  setCookiesItem,
} from "@ribon.io/shared/lib";
import { userAuthenticationApi } from "@ribon.io/shared/services";

export interface IAuthenticationContext {
  signInWithGoogle: (response: any) => void;
  signInWithApple: (response: any) => void;
  accessToken: string | null;
  isAuthorized: (email: string) => boolean;
  user: any | undefined;
  setUser: (user: any) => void;
  allowed: boolean;
  logout: () => void;
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
    } catch (error) {
      throw new Error("google auth error");
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
    } catch (error) {
      throw new Error("google auth error");
    }
  }

  function logout() {
    removeCookiesItem(ACCESS_TOKEN_KEY);
    removeCookiesItem(REFRESH_TOKEN_KEY);
    setUser(undefined);
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
    }),
    [user, allowed, accessToken],
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
