import { useCallback, useEffect, useState } from "react";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";

export function useActiveCauses() {
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);

  const { causes } = useCauses();

  const fetchCause = useCallback(async () => {
    const causesApi = causes.filter((cause) => cause.active);
    setActiveCauses(causesApi);
  }, [causes]);

  useEffect(() => {
    fetchCause();
  }, [causes]);

  return {
    activeCauses,
    fetchCause,
  };
}

export default useActiveCauses;
