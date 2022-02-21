import { useLocation } from "react-router-dom";
import { useMemo } from "react";

function useQueryParams() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

export default useQueryParams;
