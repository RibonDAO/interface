import { useState } from "react";
import CardPage from "./CardPage";
import CryptoPage from "./CryptoPage";

function SupportCausePage(): JSX.Element {
  const [currentSection] = useState<"card" | "crypto">("crypto");

  return currentSection === "card" ? <CardPage /> : <CryptoPage />;
}

export default SupportCausePage;
