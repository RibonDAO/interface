import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import { useCurrentUser } from "contexts/currentUserContext";
import Item from "../Item";

function signInOrCreateAccount(): JSX.Element | null {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.settingsMenu",
  });

  const { navigateTo } = useNavigation();

  const { currentUser } = useCurrentUser();

  const handleClick = () => {
    logEvent("openAuthBtn_click", {
      from: "config_page",
    });
    navigateTo("/auth/sign-in");
  };

  if (currentUser) return null;

  return (
    <Item
      icon={{
        name: "account_circle",
      }}
      text={t("signInOrCreateAccount")}
      onClickHandler={() => handleClick()}
    />
  );
}

export default signInOrCreateAccount;
