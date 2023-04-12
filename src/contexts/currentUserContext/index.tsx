import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setUserId } from "services/analytics/firebase";
import { User } from "@ribon.io/shared/types";
import { initializeApi } from "services/api";

export interface ICurrentUserContext {
  currentUser: User | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  updateCurrentUser: (data: Partial<User>) => void;
  logoutCurrentUser: () => void;
  signedIn: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CurrentUserContext = createContext<ICurrentUserContext>(
  {} as ICurrentUserContext,
);

export const CURRENT_USER_KEY = "CURRENT_USER_KEY";
export const SHOW_MENU = "SHOW_MENU";

function CurrentUserProvider({ children }: Props) {
  function getUserFromLocalStorage() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (!user || user === "undefined") return undefined;

    return JSON.parse(user);
  }

  const [currentUser, setCurrentUser] = useState<User | undefined>(
    getUserFromLocalStorage(),
  );

  const [signedIn, setSignedIn] = useState(false);

  function updateCurrentUser(data: Partial<User>) {
    setCurrentUser({ ...currentUser, data } as User);
  }

  function logoutCurrentUser() {
    setCurrentUser(undefined);
    localStorage.removeItem(CURRENT_USER_KEY);
    localStorage.removeItem(SHOW_MENU);
  }

  function setUserInLocalStorage() {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  function setUserIdInAnalytics() {
    if (currentUser?.id) {
      setUserId(currentUser?.id);
    }
  }

  useEffect(() => {
    setSignedIn(!!currentUser);
    setUserInLocalStorage();
    initializeApi();

    if (process.env.NODE_ENV !== "development") {
      setUserIdInAnalytics();
    }
  }, [currentUser]);

  const currentUserObject: ICurrentUserContext = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
      updateCurrentUser,
      signedIn,
      logoutCurrentUser,
    }),
    [currentUser, signedIn],
  );

  return (
    <CurrentUserContext.Provider value={currentUserObject}>
      {children}
    </CurrentUserContext.Provider>
  );
}

export default CurrentUserProvider;

export const useCurrentUser = () => {
  const context = useContext(CurrentUserContext);

  if (!context) {
    throw new Error("useCurrentUser must be used within CurrentUserProvider");
  }

  return context;
};
