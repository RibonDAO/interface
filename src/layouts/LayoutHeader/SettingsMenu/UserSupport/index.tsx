import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { useLanguage } from "hooks/useLanguage";
import { Languages } from "@ribon.io/shared/types";
import startSupportChat from "services/support";
import Item from "../Item";

function UserSupport(): JSX.Element {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.settingsMenu.userSupport",
  });
  const { currentLang } = useLanguage();

  const handleClick = () => {
    logEvent("supportBtn_click", {
      from: "config_page",
    });
    if (currentLang === Languages.PT) {
      window.open(t("link"), "_blank");
    } else {
      startSupportChat();
    }
  };

  return (
    <Item
      icon={{
        name: "support_agent",
      }}
      text={t("text")}
      onClickHandler={() => handleClick()}
    />
  );
}

export default UserSupport;
