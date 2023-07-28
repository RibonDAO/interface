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
  chosenCauseIndex: number | undefined;
  setChosenCause: (cause: SetStateAction<Cause | undefined>) => void;
  setChosenCauseId: (id: SetStateAction<number | undefined>) => void;
  setChosenCauseIndex: (id: SetStateAction<number | undefined>) => void;
}

export const CauseContributionContext =
  createContext<ICauseContributionContext>({} as ICauseContributionContext);
CauseContributionContext.displayName = "CauseContributionContext";

function CauseContributionProvider({ children }: any) {
  const { causes } = useCausesContext();
  const [chosenCause, setChosenCause] = useState<Cause | undefined>(causes[0]);
  const [chosenCauseId, setChosenCauseId] = useState<number | undefined>();
  const [chosenCauseIndex, setChosenCauseIndex] = useState<number | undefined>(
    0,
  );

  useEffect(() => {
    if (chosenCauseId) {
      setChosenCause(causes.find((cause) => cause.id === chosenCauseId));
    }
  }, [chosenCauseId]);

  useEffect(() => {
    if (causes) {
      setChosenCause(causes[0]);
    }
  }, [causes]);

  const causeContributionObject: ICauseContributionContext = useMemo(
    () => ({
      chosenCause,
      setChosenCause,
      setChosenCauseId,
      chosenCauseIndex,
      setChosenCauseIndex,
    }),
    [
      chosenCause,
      setChosenCause,
      setChosenCauseId,
      chosenCauseIndex,
      setChosenCauseId,
    ],
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
