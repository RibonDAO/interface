import { useEffect } from "react";

function ChristmasCampaignPage() {
  useEffect(() => {
    window.location.replace(
      "https://projetos.ribon.io/natal?utm_source=ribon&utm_medium=task&utm_campaign=natal",
    );
  }, []);

  return <div />;
}

export default ChristmasCampaignPage;
