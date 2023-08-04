import { useEffect } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";

function useLocalStorageEffect(key: string, value: string) {
  useEffect(() => {
    if (value !== getLocalStorageItem(key)) {
      setLocalStorageItem(key, value);
    }
  }, [key, value]);
}

export default useLocalStorageEffect;
