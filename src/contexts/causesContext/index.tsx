import useCauses from "hooks/apiHooks/useCauses";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import Cause from "types/entities/Cause";

export interface ICausesContext {
  causes: Cause[];
  activeCauses: Cause[];
  chosenCause: Cause | undefined;
  chooseCauseModalVisible: boolean;
  selectedCauseIndex: number;
  setSelectedCauseIndex: (index: number) => void;
  setChooseCauseModalVisible: (visible: boolean) => void;
  refetch: () => void;
}

export const CausesContext = createContext<ICausesContext>(
  {} as ICausesContext,
);

function CausesProvider({ children }: any) {
  const { causes, refetch } = useCauses();
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);
  const [chooseCauseModalVisible, setChooseCauseModalVisible] = useState(false);
  const [selectedCauseIndex, setSelectedCauseIndex] = useState(0);

  const causesFilter = () => causes.filter((cause) => cause.active);

  useEffect(() => {
    setActiveCauses(causesFilter());
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
    }),
    [causes, chooseCauseModalVisible, activeCauses, selectedCauseIndex],
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
