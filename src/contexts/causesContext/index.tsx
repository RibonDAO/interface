import useCauses from "hooks/apiHooks/useCauses";
import { createContext, useContext, useMemo } from "react";
import Cause from "types/entities/Cause";

export interface ICausesContext {
  causes: Cause[];
  chosenCause: Cause | undefined;
  refetch: () => void;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);

function CausesProvider({ children }: any) {
  const { causes, refetch } = useCauses();

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      refetch,
      chosenCause: causes[0],
    }),
    [causes],
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
