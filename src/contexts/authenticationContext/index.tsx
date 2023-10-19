import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "utils/constants";
import { getCookiesItem, removeCookiesItem } from "lib/cookies";

// todo: create goggle, apple and magic link login
export interface IAuthenticationContext {
  accessToken: string | null;
  logout: () => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const AuthenticationContext = createContext<IAuthenticationContext>(
  {} as IAuthenticationContext,
);

function AuthenticationProvider({ children }: Props) {
  const [accessToken] = useState(getCookiesItem(ACCESS_TOKEN_KEY));

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
      accessToken,
    }),
    [accessToken],
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
