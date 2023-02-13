import { useCauses } from "@ribon.io/shared/hooks";
import {
  createContext,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import Cause from "types/entities/Cause";

export interface ICausesContext {
  causes: Cause[];
  activeCauses: Cause[];
  chosenCause: Cause | undefined;
  chooseCauseModalVisible: boolean;
  setChooseCauseModalVisible: (visible: SetStateAction<boolean>) => void;
  currentCauseId: number;
  setCurrentCauseId: (id: SetStateAction<number>) => void;
  refetch: () => void;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);

function CausesProvider({ children }: any) {
  const causeWasNotSelectedByModal = -1;
  const { causes, refetch, isLoading } = useCauses();
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [currentCauseId, setCurrentCauseId] = useState(
    causeWasNotSelectedByModal,
  );

  const causesFilter = () => causes.filter((cause) => cause.active);

  useEffect(() => {
    if (!isLoading) {
      setActiveCauses(causesFilter());
      setCurrentCauseId(activeCauses[0]?.id);
    }
  }, [causes, isLoading]);

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      refetch,
      chosenCause: causes[0],
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      activeCauses,
      currentCauseId,
      setCurrentCauseId,
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
