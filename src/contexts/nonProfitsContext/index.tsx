import {
  useFreeDonationNonProfits,
  useNonProfits,
} from "@ribon.io/shared/hooks";
import { createContext, useContext, useMemo } from "react";
import { NonProfit } from "@ribon.io/shared/types";

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
  const {
    nonProfits: nonProfitsWithPoolBalance,
    refetch: refetchActive,
    isLoading: isLoadingActive,
  } = useFreeDonationNonProfits();
  const { nonProfits, refetch, isLoading } = useNonProfits();
  const activeNonProfits = nonProfitsWithPoolBalance?.filter(
    (nonProfit) => nonProfit?.cause?.withPoolBalance,
  );

  const nonProfitsObject: INonProfitsContext = useMemo(
    () => ({
      nonProfits,
      activeNonProfits,
      refetch,
      refetchActive,
      isLoadingActive,
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
