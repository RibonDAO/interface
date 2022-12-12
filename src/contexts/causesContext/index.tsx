import useCauses from "hooks/apiHooks/useCauses";
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
  selectedCauseIndex: number;
  setSelectedCauseIndex: (index: SetStateAction<number>) => void;
  currentCauseId: number;
  setCurrentCauseId: (id: SetStateAction<number>) => void;
  refetch: () => void;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);

function CausesProvider({ children }: any) {
  const causeWasNotSelectedByModal = -1;
  const { causes, refetch } = useCauses();
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [selectedCauseIndex, setSelectedCauseIndex] = useState(0);
  const [currentCauseId, setCurrentCauseId] = useState(
    causeWasNotSelectedByModal,
  );

  const causesFilter = () => causes.filter((cause) => cause.active);

  useEffect(() => {
    setActiveCauses(causesFilter());
    setCurrentCauseId(activeCauses[0]?.id);
  }, [causes]);

  const causesObject: ICausesContext = useMemo(
    () => ({
      causes,
      refetch,
      chosenCause: causes[0],
      chooseCauseModalVisible,
      setChooseCauseModalVisible,
      activeCauses,
      selectedCauseIndex,
      setSelectedCauseIndex,
      currentCauseId,
      setCurrentCauseId,
    }),
    [
      causes,
      chooseCauseModalVisible,
      activeCauses,
      selectedCauseIndex,
      currentCauseId,
    ],
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
