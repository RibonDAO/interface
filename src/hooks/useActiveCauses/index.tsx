import { useEffect, useState } from "react";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";

export function useActiveCauses() {
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);

  const { causes } = useCauses();

  useEffect(() => {
    const causesApi = causes.filter((cause) => cause.active);
    setActiveCauses(causesApi);
  }, [causes]);

  return {
    activeCauses,
  };
}

export default useActiveCauses;
