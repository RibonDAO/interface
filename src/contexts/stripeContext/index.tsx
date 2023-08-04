import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { loadStripe, Stripe } from "@stripe/stripe-js";
import { logError } from "services/crashReport";
import { STRIPE_PUBLISHABLE_KEY } from "utils/constants";

export interface IStripeContext {
  stripe: Stripe | null;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const StripeContext = createContext<IStripeContext>(
  {} as IStripeContext,
);

function StripeProvider({ children }: Props) {
  const [stripe, setStripe] = useState<Stripe | null>(null);

  useEffect(() => {
    async function fetchStripe() {
      try {
        const response = await loadStripe(STRIPE_PUBLISHABLE_KEY);
        setStripe(response);
      } catch (e) {
        logError(e);
      }
    }

    fetchStripe();
  }, []);

  const stripeObject: IStripeContext = useMemo(
    () => ({
      stripe,
    }),
    [stripe],
  );

  return (
    <StripeContext.Provider value={stripeObject}>
      {children}
    </StripeContext.Provider>
  );
}

export default StripeProvider;

export const useStripe = () => {
  const context = useContext(StripeContext);

  if (!context) {
    throw new Error("useStripe must be used within StripeProvider");
  }

  return context;
};
