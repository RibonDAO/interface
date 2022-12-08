import useCauses from "hooks/apiHooks/useCauses";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cause from "types/entities/Cause";

export interface ICausesContext {
  causes: Cause[];
  activeCauses: Cause[];
  chosenCause: Cause | undefined;
  chooseCauseModalVisible: boolean;
  setChooseCauseModalVisible: (visible: boolean) => void;
  selectedCauseIndex: number;
  setSelectedCauseIndex: (index: number) => void;
  causeIdSelectedByModal: number;
  setCauseIdSelectedByModal: (id: number) => void;
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
  const [causeIdSelectedByModal, setCauseIdSelectedByModal] = useState(
    causeWasNotSelectedByModal,
  );

  const causesFilter = () => causes.filter((cause) => cause.active);

  useEffect(() => {
    setActiveCauses(causesFilter());
    setCauseIdSelectedByModal(activeCauses[0]?.id);
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
      causeIdSelectedByModal,
      setCauseIdSelectedByModal,
    }),
    [
      causes,
      chooseCauseModalVisible,
      activeCauses,
      selectedCauseIndex,
      causeIdSelectedByModal,
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
