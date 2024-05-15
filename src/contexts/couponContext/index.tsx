import { createContext, useContext, useMemo, useState } from "react";

export interface ICouponContext {
  couponId: string | undefined;
  setCouponId: (couponId: string | undefined) => void;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const CouponContext = createContext<ICouponContext>(
  {} as ICouponContext,
);

function CouponProvider({ children }: Props) {
  const [couponId, setCouponId] = useState<string | undefined>();

  const couponObject: ICouponContext = useMemo(
    () => ({
      couponId,
      setCouponId,
    }),
    [couponId, setCouponId],
  );

  return (
    <CouponContext.Provider value={couponObject}>
      {children}
    </CouponContext.Provider>
  );
}

export default CouponProvider;

export const useCouponContext = () => {
  const context = useContext(CouponContext);

  if (!context) {
    throw new Error("useCoupon must be used within CouponProvider");
  }

  return context;
};
