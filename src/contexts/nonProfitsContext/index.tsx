import { NonProfit, useFreeDonationNonProfits } from "@ribon.io/shared";
import { createContext, useContext, useMemo } from "react";

export interface INonProfitsContext {
  nonProfits: NonProfit[] | undefined;
  activeNonProfits: NonProfit[] | undefined;
  refetch: () => void;
  isLoading: boolean;
}

export const NonProfitsContext = createContext<INonProfitsContext>(
  {} as INonProfitsContext,
);
NonProfitsContext.displayName = "NonProfitsContext";

function NonProfitsProvider({ children }: any) {
  const { nonProfits, refetch, isLoading } = useFreeDonationNonProfits();
  const activeNonProfits = nonProfits?.filter(
    (nonProfit) =>
      nonProfit?.cause?.active && nonProfit?.cause?.withPoolBalance,
  );

  const nonProfitsObject: INonProfitsContext = useMemo(
    () => ({
      nonProfits,
      activeNonProfits,
      refetch,
      isLoading,
    }),
    [nonProfits, refetch, isLoading],
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
