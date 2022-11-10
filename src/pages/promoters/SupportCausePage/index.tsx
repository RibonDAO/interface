import { useState } from "react";
import useQueryParams from "hooks/useQueryParams";
import CardPage from "./CardPage";
import CryptoPage from "./CryptoPage";

function SupportCausePage(): JSX.Element {
  const queryParams = useQueryParams();
  const paymentMethod = queryParams.get("payment_method") || "card";
  const [currentSection] = useState(paymentMethod);

  return currentSection === "card" ? <CardPage /> : <CryptoPage />;
}

export default SupportCausePage;
