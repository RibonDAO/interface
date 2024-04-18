import { theme } from "@ribon.io/shared/styles";
import Banner from "components/moleculars/banners/Banner";
import { logEvent } from "lib/events";
import { useTranslation } from "react-i18next";
import CardBackground from "./assets/background.svg";

function IntegrationSupportBanner(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.integrationSupportBanner",
  });

  const handleClick = () => {
    logEvent("integrationSupportBtn_click");
    window.open(t("link"), "_blank");
  };

  return (
    <Banner
      onArrowClick={handleClick}
      title={{
        text: t("title"),
        size: "medium",
        color: theme.colors.neutral[900],
      }}
      text={t("text")}
      icon={{
        name: "support_agent",
        color: theme.colors.neutral[900],
        size: "24px",
        withCircle: true,
      }}
      textColor={theme.colors.neutral[900]}
      cardBackground={CardBackground}
      backgroundColor={theme.colors.brand.secondary[100]}
      arrowLinkColor={theme.colors.brand.secondary[800]}
    />
  );
}

export default IntegrationSupportBanner;
