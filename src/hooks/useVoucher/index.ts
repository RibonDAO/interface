import { useEffect, useState } from "react";
import {
  setLocalStorageItem,
  getLocalStorageItem,
  removeLocalStorageItem,
} from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";

function useVoucher() {
  const [voucher, setVoucher] = useState(
    getLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER) || false,
  );

  useEffect(() => {
    if (voucher) {
      setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "true");
    } else {
      removeLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);
    }
  }, [voucher]);

  const destroyVoucher = () => setVoucher(false);

  const createVoucher = () => setVoucher(true);

  const isVoucherAvailable = () =>
    getLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);

  return {
    destroyVoucher,
    createVoucher,
    isVoucherAvailable,
  };
}

export default useVoucher;
