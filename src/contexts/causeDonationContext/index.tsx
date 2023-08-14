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

export interface ICauseDonationContext {
  chosenCause: Cause | undefined;
  chosenCauseIndex: number | undefined;
  setChosenCause: (cause: SetStateAction<Cause | undefined>) => void;
  chooseCauseModalVisible: boolean;
  setChooseCauseModalVisible: (visible: SetStateAction<boolean>) => void;
  setChosenCauseId: (id: SetStateAction<number | undefined>) => void;
  setChosenCauseIndex: (id: SetStateAction<number | undefined>) => void;
}

export const CauseDonationContext = createContext<ICauseDonationContext>(
  {} as ICauseDonationContext,
);
CauseDonationContext.displayName = "CauseDonationContext";

function CauseDonationProvider({ children }: any) {
  const { causesWithPoolBalance } = useCausesContext();
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [chosenCause, setChosenCause] = useState<Cause | undefined>();
  const [chosenCauseId, setChosenCauseId] = useState<number | undefined>();
  const [chosenCauseIndex, setChosenCauseIndex] = useState<number | undefined>(
    0,
  );

  useEffect(() => {
    if (chosenCauseId) {
      setChosenCause(
        causesWithPoolBalance.find((cause) => cause.id === chosenCauseId),
      );
    }
  }, [chosenCauseId]);

  const causeDonationObject: ICauseDonationContext = useMemo(
    () => ({
      chosenCause,
      setChosenCause,
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      setChosenCauseId,
      chosenCauseIndex,
      setChosenCauseIndex,
    }),
    [
      chosenCause,
      setChosenCause,
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      setChosenCauseId,
      chosenCauseIndex,
      setChosenCauseIndex,
    ],
  );

  return (
    <CauseDonationContext.Provider value={causeDonationObject}>
      {children}
    </CauseDonationContext.Provider>
  );
}

export default CauseDonationProvider;

export function useCauseDonationContext() {
  const context = useContext(CauseDonationContext);

  if (!context) {
    throw new Error(
      "useCauseDonationContext must be used within a CauseDonationProvider",
    );
  }

  return context;
}
