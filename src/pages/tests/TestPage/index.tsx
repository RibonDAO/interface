import { PaymentElement, Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";

const clientSecret = "pi_3NaH96JuOnwQq9Qx1qvrvd6A_secret_Y3mDv5AxAAFhSdW40z52e7n6u";
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
    clientSecret,
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
    console.log(stripe);
    if (stripe) {
      stripe.confirmPixPayment(
        clientSecret,
      );
    }
  }, [stripe]);

  if(!stripe) return null;

  return (
    <div>
      <StripeProvider stripe={stripe}>
        <CheckoutForm />
      </StripeProvider>
    </div>
  );
}

export default TestPage;
