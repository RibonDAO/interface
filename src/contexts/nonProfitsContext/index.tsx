import { useNonProfits } from "@ribon.io/shared/hooks";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { NonProfit } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";

export interface INonProfitsContext {
  nonProfits: NonProfit[] | undefined;
  filteredNonProfits: NonProfit[] | undefined;
  refetch: () => void;
  isLoading: boolean;
  shuffledNonProfits?: NonProfit[];
}

export const NonProfitsContext = createContext<INonProfitsContext>(
  {} as INonProfitsContext,
);
NonProfitsContext.displayName = "NonProfitsContext";

function NonProfitsProvider({ children }: any) {
  const { nonProfits, refetch, isLoading } = useNonProfits();
  const { currentUser } = useCurrentUser();
  const isRibonUser = currentUser?.email.includes("@ribon.io");

  const [userStatusChanged, setUserStatusChanged] = useState(false);

  useEffect(() => {
    if (isRibonUser) {
      setUserStatusChanged(true);
    }
  }, [isRibonUser]);

  useEffect(() => {
    if (userStatusChanged) {
      refetch();
      setUserStatusChanged(false);
    }
  }, [userStatusChanged, refetch]);

  const filteredNonProfits = nonProfits?.filter((nonProfit) => {
    if (isRibonUser) {
      return nonProfit.status === "test" || nonProfit.cause.withPoolBalance;
    } else {
      return nonProfit.cause.withPoolBalance;
    }
  });

  const shuffledNonProfits = filteredNonProfits?.sort(
    () => 0.5 - Math.random(),
  );

  const nonProfitsObject: INonProfitsContext = useMemo(
    () => ({
      nonProfits,
      filteredNonProfits,
      refetch,
      isLoading,
      shuffledNonProfits,
    }),
    [nonProfits, refetch, isLoading, shuffledNonProfits, filteredNonProfits],
  );

  return (
    <NonProfitsContext.Provider value={nonProfitsObject}>
      {children}
    </NonProfitsContext.Provider>
  );
}

export default NonProfitsProvider;

export const useNonProfitsContext = () => {
  const context = useContext(NonProfitsContext);

  if (!context) {
    throw new Error("useNonProfits must be used within NonProfitsProvider");
  }

  return context;
};
