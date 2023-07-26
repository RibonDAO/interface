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
  setChosenCause: (cause: SetStateAction<Cause | undefined>) => void;
  chooseCauseModalVisible: boolean;
  setChooseCauseModalVisible: (visible: SetStateAction<boolean>) => void;
  setChosenCauseId: (id: SetStateAction<number | undefined>) => void;
}

export const CauseDonationContext = createContext<ICauseDonationContext>(
  {} as ICauseDonationContext,
);
CauseDonationContext.displayName = "CauseDonationContext";

function CauseDonationProvider({ children }: any) {
  const { causes } = useCausesContext();
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [chosenCause, setChosenCause] = useState<Cause | undefined>();
  const [chosenCauseId, setChosenCauseId] = useState<number | undefined>();

  useEffect(() => {
    if (chosenCauseId) {
      setChosenCause(causes.find((cause) => cause.id === chosenCauseId));
    }
  }, [chosenCauseId]);

  const causeDonationObject: ICauseDonationContext = useMemo(
    () => ({
      chosenCause,
      setChosenCause,
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      setChosenCauseId,
    }),
    [
      chosenCause,
      setChosenCause,
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      setChosenCauseId,
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
