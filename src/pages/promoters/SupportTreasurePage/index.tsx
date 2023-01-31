import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ToggleSwitchText from "components/atomics/ToggleSwitchText";
import { logError } from "services/crashReport";
import { logEvent } from "lib/events";
import * as S from "./styles";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";

function SupportTreasurePage(): JSX.Element {
  const [isCard, setIsCard] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportTreasurePage",
  });

  useEffect(() => {
    logEvent("treasureSupportScreen_view");
  }, []);

  const handleChange = () => {
    try {
      setIsCard(!isCard);
      logEvent("treasureSupportGivingTogBtn_click", {
        option: isCard ? "card" : "cryptocurrency",
      });
    } catch (error) {
      logError(error);
    }
  };

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <ToggleSwitchText
        leftText={t("card")}
        rightText={t("cryptocurrency")}
        onClick={handleChange}
      />

      {isCard ? <CardSection /> : <CryptoSection />}
    </S.Container>
  );
}

export default SupportTreasurePage;
