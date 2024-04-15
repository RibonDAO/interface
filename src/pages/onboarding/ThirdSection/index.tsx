import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { theme } from "@ribon.io/shared/styles";
import CardInfo from "components/moleculars/cards/CardInfo";
import * as S from "./styles";

function ThirdSection(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "onboarding.thirdSection",
  });

  useEffect(() => {
    logEvent("P34_view", { from: "onboarding" });
  }, []);

  return (
    <S.Container>
      <S.Title>{t("title")}</S.Title>
      <CardInfo
        icon={{
          name: "confirmation_number",
          withCircle: true,
          color: theme.colors.brand.secondary[800],
          size: "20px",
          backgroundColor: "transparent",
        }}
        title={t("cardTitle1")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.secondary[100]}
        backgroundColor={theme.colors.brand.secondary[25]}
      >
        {t("cardDescription1")}
      </CardInfo>
      <CardInfo
        icon={{
          name: "volunteer_activism",
          withCircle: true,
          color: theme.colors.brand.quaternary[600],
          size: "20px",
          backgroundColor: "transparent",
        }}
        title={t("cardTitle2")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.quaternary[100]}
        backgroundColor={theme.colors.brand.quaternary[25]}
      >
        {t("cardDescription2")}
      </CardInfo>
      <CardInfo
        icon={{
          name: "psychiatry",
          withCircle: true,
          color: theme.colors.brand.primary[800],
          size: "20px",
          backgroundColor: "transparent",
        }}
        title={t("cardTitle3")}
        titleColor={theme.colors.neutral[800]}
        iconBackgroundColor={theme.colors.brand.primary[100]}
        backgroundColor={theme.colors.brand.primary[25]}
      >
        {t("cardDescription3")}
      </CardInfo>
    </S.Container>
  );
}

export default ThirdSection;
