import { useFreeDonationCauses } from "@ribon.io/shared/hooks";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Cause } from "@ribon.io/shared/types";
import { getSessionStorageItem } from "lib/sessionStorage";
import { SELECTED_CAUSE_ID } from "lib/sessionStorage/constants";

export interface ICausesContext {
  causes: Cause[];
  activeCauses: Cause[];
  chosenCause: Cause | undefined;
  setChosenCause: (id: SetStateAction<Cause | undefined>) => void;
  chooseCauseModalVisible: boolean;
  setChooseCauseModalVisible: (visible: SetStateAction<boolean>) => void;
  currentCauseId: number;
  setCurrentCauseId: (id: SetStateAction<number>) => void;
  currentCauseIndex: number;
  refetch: () => void;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);

function CausesProvider({ children }: any) {
  const causeWasNotSelectedByModal = -1;
  const causeIdFromSessionStorage = Number(
    getSessionStorageItem(SELECTED_CAUSE_ID),
  );
  const { causes, refetch, isLoading } = useFreeDonationCauses();
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [currentCauseId, setCurrentCauseId] = useState(
    causeIdFromSessionStorage || causeWasNotSelectedByModal,
  );
  const [chosenCause, setChosenCause] = useState<Cause | undefined>(causes[0]);
  const [currentCauseIndex, setCurrentCauseIndex] = useState(
    causeIdFromSessionStorage || 0,
  );

  const causesFilter = () => causes.filter((cause) => cause.active);

  useEffect(() => {
    if (!isLoading) {
      setActiveCauses(causesFilter());
      setCurrentCauseId(causeWasNotSelectedByModal);

      if (getSessionStorageItem(SELECTED_CAUSE_ID)) {
        const causeId = causeIdFromSessionStorage;
        setCurrentCauseId(causeId);
        setChosenCause(causes.find((cause) => cause.id === causeId));
      }
    }
  }, [JSON.stringify(causes), isLoading, currentCauseId]);

  useEffect(() => {
    const newIndex = causes.findIndex((cause) => cause.id === currentCauseId);
    setCurrentCauseIndex(newIndex === -1 ? 0 : newIndex);
  }, [currentCauseId]);

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      refetch,
      chosenCause,
      setChosenCause,
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      activeCauses,
      currentCauseId,
      setCurrentCauseId,
      currentCauseIndex,
    }),
    [causes, chooseCauseModalVisible, activeCauses, currentCauseId],
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
