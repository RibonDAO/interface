import { useEffect, useState } from "react";
import useCauses from "hooks/apiHooks/useCauses";
import Cause from "types/entities/Cause";

export function useActiveCauses() {
  const [activeCauses, setActiveCauses] = useState<Cause[]>([]);

  const { causes } = useCauses();

  function fetchCauses() {
    const causesApi = causes.filter((cause) => cause.active);
    setActiveCauses(causesApi);
  }

  useEffect(() => {
    fetchCauses();
  }, [causes]);

  return {
    activeCauses,
  };
}

export default useActiveCauses;
