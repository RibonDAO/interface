import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets as useTicketsShared } from "@ribon.io/shared/hooks";
import { useCouponContext } from "contexts/couponContext";
import { logError } from "services/crashReport";
import { PLATFORM } from "utils/constants";

type HandleCollectProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useCoupons() {
  const { currentUser } = useCurrentUser();
  const { canCollectByCoupon, collectByCoupon } = useTicketsShared();
  const { couponId } = useCouponContext();

  async function handleCanCollectByCoupon() {
    if (!couponId) {
      return { canCollect: false };
    }
    const response = await canCollectByCoupon(
      couponId,
      PLATFORM,
      currentUser?.email ?? "",
    );

    return response.data;
  }

  async function handleCollectByCoupon({
    onError,
    onSuccess,
  }: HandleCollectProps) {
    try {
      if (couponId) {
        await collectByCoupon(couponId, PLATFORM, currentUser?.email ?? "");
        if (onSuccess) onSuccess();
      }
    } catch (e: any) {
      logError(e);
      if (onError) onError(e);
    }
  }

  return {
    handleCanCollectByCoupon,
    handleCollectByCoupon,
  };
}
