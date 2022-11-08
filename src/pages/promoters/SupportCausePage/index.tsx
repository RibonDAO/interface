import { useState } from "react";
import CardPage from "./CardPage";
import CryptoPage from "./CryptoPage";

function SupportCausePage(): JSX.Element {
  const [currentSection] = useState<"card" | "crypto">("card");

  function renderCurrentSection() {
    if (currentSection === "card") {
      return <CardPage />;
    }

    return <CryptoPage />;
  }

  return renderCurrentSection();
}

export default SupportCausePage;
