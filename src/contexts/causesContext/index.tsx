import { useCauses } from "@ribon.io/shared/hooks";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { Cause } from "@ribon.io/shared/types";
import { useCurrentUser } from "contexts/currentUserContext";

export interface ICausesContext {
  causes: Cause[];
  filteredCauses: Cause[];
  refetch: () => void;
  isLoading: boolean;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);
CausesContext.displayName = "CausesContext";

function CausesProvider({ children }: any) {
  const { causes, refetch, isLoading } = useCauses();
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

  const filteredCauses = causes?.filter((cause) => {
    if (isRibonUser) {
      return cause.status === "test" || cause.withPoolBalance;
    } else {
      return cause.withPoolBalance;
    }
  });

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      filteredCauses,
      refetch,
      isLoading,
    }),
    [causes, refetch, isLoading],
  );

  return (
    <CausesContext.Provider value={causesObject}>
      {children}
    </CausesContext.Provider>
  );
}

export default CausesProvider;

export function useCausesContext() {
  const context = useContext(CausesContext);

  if (!context) {
    throw new Error("useCausesContext must be used within a CausesProvider");
  }

  return context;
}
