import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import extractUtmFromUrl from "lib/extractUtmFromUrl";
import Utm from "types/entities/Utm";

export default function useUtm() {
  const [utm, setUtm] = useState<Utm | null>({});
  const location = useLocation();

  useEffect(() => {
    setUtm(extractUtmFromUrl(location.search));
  }, [location.search]);

  return utm;
}
