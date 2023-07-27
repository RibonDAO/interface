import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

function CheckoutForm() {
  return (
    <form>
      <PaymentElement />
      <button type="submit">Submit</button>
    </form>
  );
}

function StripeProvider({ children, stripe }: any) {
  const options = {
    clientSecret:
      "pi_3NYEKdJuOnwQq9Qx0n209ZCi_secret_2cDgN7YFVugwfT5Bip3weF02a",
  };

  if (!stripe) return null;

  return (
    <Elements stripe={stripe} options={options}>
      {children}
    </Elements>
  );
}

function TestPage() {
  const [stripe, setStripe] = useState<any>(null);
  useEffect(() => {
    loadStripe(
      "pk_test_51JRgaRJuOnwQq9Qx2RrybIhE1vRgC5tNd32EJkINCTmgGZYSr3QXne9y5CAdEq36WULJPmWv2VvZZ0xA5MNTrY7C00KL9rq6Op",
    )
      .then((response) => {
        setStripe(response);
      })
      .catch(() => {
        console.log("catchiou");
      });
  }, []);

  useEffect(() => {
    // if (stripe) {
    //   stripe.confirmPixPayment(
    //     "",
    //   );
    // }
  }, [stripe]);

  return (
    <div>
      <StripeProvider stripe={stripe}>
        <CheckoutForm />
      </StripeProvider>
    </div>
  );
}

export default TestPage;
