import { useCauses } from "@ribon.io/shared/hooks";
import { createContext, useContext, useMemo } from "react";
import { Cause } from "@ribon.io/shared/types";

export interface ICausesContext {
  causes: Cause[];
  causesWithPoolBalance: Cause[];
  refetch: () => void;
  isLoading: boolean;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);
CausesContext.displayName = "CausesContext";

function CausesProvider({ children }: any) {
  const { causes, refetch, isLoading } = useCauses();
  const causesWithPoolBalance = causes?.filter(
    (cause) => cause.withPoolBalance,
  );

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      causesWithPoolBalance,
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
