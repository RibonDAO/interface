import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cause } from "@ribon.io/shared/types";
import { useCausesContext } from "contexts/causesContext";

export interface ICauseContributionContext {
  chosenCause: Cause | undefined;
  setChosenCause: (cause: SetStateAction<Cause | undefined>) => void;
  setChosenCauseId: (id: SetStateAction<number | undefined>) => void;
}

export const CauseContributionContext =
  createContext<ICauseContributionContext>({} as ICauseContributionContext);
CauseContributionContext.displayName = "CauseContributionContext";

function CauseContributionProvider({ children }: any) {
  const { causes } = useCausesContext();
  const [chosenCause, setChosenCause] = useState<Cause | undefined>();
  const [chosenCauseId, setChosenCauseId] = useState<number | undefined>();

  useEffect(() => {
    if (chosenCauseId) {
      setChosenCause(causes.find((cause) => cause.id === chosenCauseId));
    }
  }, [chosenCauseId]);

  const causeContributionObject: ICauseContributionContext = useMemo(
    () => ({
      chosenCause,
      setChosenCause,
      setChosenCauseId,
    }),
    [chosenCause, setChosenCause, setChosenCauseId],
  );

  return (
    <CauseContributionContext.Provider value={causeContributionObject}>
      {children}
    </CauseContributionContext.Provider>
  );
}

export default CauseContributionProvider;

export function useCauseContributionContext() {
  const context = useContext(CauseContributionContext);

  if (!context) {
    throw new Error(
      "useCauseContributionContext must be used within a CauseContributionProvider",
    );
  }

  return context;
}
