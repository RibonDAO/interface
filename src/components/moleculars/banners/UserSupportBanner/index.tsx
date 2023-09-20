import { Languages } from "@ribon.io/shared/types";
import { theme } from "@ribon.io/shared/styles";
import Banner from "components/moleculars/banners/Banner";
import { useLanguage } from "hooks/useLanguage";
import { logEvent } from "lib/events";
import { useTranslation } from "react-i18next";
import startSupportChat from "services/support";
import CardBackground from "./assets/background.svg";

type Props = {
  from: string;
};
function UserSupportBanner({ from }: Props): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.userSupportBanner",
  });
  const { currentLang } = useLanguage();

  const handleClick = () => {
    logEvent("supportBtn_click", {
      from,
    });
    if (currentLang === Languages.PT) {
      window.open(t("userSupportLink"), "_blank");
    } else {
      startSupportChat();
    }
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

export default UserSupportBanner;
