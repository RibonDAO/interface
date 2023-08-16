import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { getLocalStorageItem, setLocalStorageItem } from "lib/localStorage";

function useLocalStorageState(
  key: string,
  initialValue = "",
): [state: string, setState: Dispatch<SetStateAction<string>>] {
  const [state, setState] = useState<string>(
    getLocalStorageItem(key) || initialValue,
  );

  useEffect(() => {
    if (state !== getLocalStorageItem(key)) {
      setLocalStorageItem(key, state);
    }
  }, [key, state]);

  return [state, setState];
}

export default useLocalStorageState;
