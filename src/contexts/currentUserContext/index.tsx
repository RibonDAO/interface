import { stringToLocaleDateString } from "lib/formatters/dateFormatter";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { setUserId } from "services/analytics";
import User from "types/entities/User";

export interface ICurrentUserContext {
  currentUser: User | undefined;
  userLastDonation: string | undefined;
  setCurrentUser: Dispatch<SetStateAction<User | undefined>>;
  setUserLastDonation: Dispatch<SetStateAction<string>>;
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
export const CURRENT_USER_LAST_DONATION_KEY = "CURRENT_USER_LAST_DONATION_KEY";

function CurrentUserProvider({ children }: Props) {
  function getUserFromLocalStorage() {
    const user = localStorage.getItem(CURRENT_USER_KEY);
    if (!user || user === "undefined") return undefined;

    return JSON.parse(user);
  }

  const [currentUser, setCurrentUser] = useState<User | undefined>(
    getUserFromLocalStorage(),
  );

  function getUserLastDonation() {
    const lastDonation = localStorage.getItem(
      `${CURRENT_USER_LAST_DONATION_KEY}_${currentUser?.id}`,
    );
    if (!lastDonation || lastDonation === "undefined") {
      if (currentUser?.lastDonationAt)
        return stringToLocaleDateString(currentUser.lastDonationAt);
      else return undefined;
    }

    return JSON.parse(lastDonation);
  }

  const [userLastDonation, setUserLastDonation] = useState<string | "">(
    getUserLastDonation(),
  );
  const [signedIn, setSignedIn] = useState(false);

  function updateCurrentUser(data: Partial<User>) {
    setCurrentUser({ ...currentUser, data } as User);
  }

  function logoutCurrentUser() {
    setCurrentUser(undefined);
    localStorage.removeItem(CURRENT_USER_KEY);
  }

  function setUserInLocalStorage() {
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
  }

  function setUserLastDonationInLocalStorage() {
    if (!currentUser?.id) return;

    localStorage.setItem(
      `${CURRENT_USER_LAST_DONATION_KEY}_${currentUser?.id}`,
      JSON.stringify(userLastDonation),
    );
  }

  function setUserIdInAnalytics() {
    if (currentUser?.id) {
      setUserId(currentUser?.id);
    }
  }

  useEffect(() => {
    setSignedIn(!!currentUser);
    setUserInLocalStorage();
    setUserLastDonationInLocalStorage();
    setUserIdInAnalytics();
  }, [currentUser, userLastDonation]);

  const currentUserObject: ICurrentUserContext = useMemo(
    () => ({
      currentUser,
      userLastDonation,
      setCurrentUser,
      setUserLastDonation,
      updateCurrentUser,
      signedIn,
      logoutCurrentUser,
    }),
    [currentUser, userLastDonation, signedIn],
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
