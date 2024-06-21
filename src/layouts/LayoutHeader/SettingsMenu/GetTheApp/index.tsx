import MoreTicketsIcon from "assets/icons/more-tickets-icon-green.svg";
import { useTranslation } from "react-i18next";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { useCurrentUser } from "contexts/currentUserContext";
import Item from "../Item";

function GetTheApp(): JSX.Element | null {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.settingsMenu",
  });

  const { navigateTo } = useNavigation();

  useEffect(() => {
    logEvent("downloadCTA_view", {
      from: "config_page",
    });
  }, []);

  const handleClick = () => {
    logEvent("downloadCTA_click", { from: "config_page" });
    navigateTo("/earn");
  };

  const { currentUser } = useCurrentUser();

  if (!currentUser) return null;

  return (
    <Item
      customIcon={MoreTicketsIcon}
      text={t("getTheApp")}
      onClickHandler={() => handleClick()}
    />
  );
}

export default GetTheApp;
