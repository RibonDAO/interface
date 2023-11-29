import { theme } from "@ribon.io/shared/styles";
import Banner from "components/moleculars/banners/Banner";
import { useLanguage } from "hooks/useLanguage";
import { logEvent } from "lib/events";
import { useTranslation } from "react-i18next";
import contactSupport from "lib/contactSupport";
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
    contactSupport(currentLang);
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
