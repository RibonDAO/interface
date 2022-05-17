import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import ToggleSwitchText from "components/atomics/ToggleSwitchText";
import { logError } from "services/crashReport";
import { logEvent } from "services/analytics";
import * as S from "./styles";
import CardSection from "./CardSection";
import CryptoSection from "./CryptoSection";

function SupportFundPage(): JSX.Element {
  const [isCard, setIsCard] = useState(false);
  const { t } = useTranslation("translation", {
    keyPrefix: "promoters.supportFundPage",
  });

  useEffect(() => {
    logEvent("fundSupportScreen_view");
  }, []);

  const handleChange = () => {
    try {
      setIsCard(!isCard);
      logEvent("fundSupportGivingTogBtn_click", {
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

export default SupportFundPage;
