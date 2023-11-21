import theme from "styles/theme";
import MoreTicketsIcon from "assets/icons/more-tickets-icon-green.svg";
import { Divider } from "components/atomics/Divider/styles";
import ChangeLanguageItem from "layouts/LayoutHeader/ChangeLanguageItem";
import LogoutItem from "layouts/LayoutHeader/LogoutItem";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import { useState } from "react";
import { logEvent } from "lib/events";
import useBreakpoint from "hooks/useBreakpoint";
import useNavigation from "hooks/useNavigation";
import { useTranslation } from "react-i18next";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";
import Item from "./Item";

type Props = {
  outline?: boolean;
};
function SettingsMenu({ outline = false }: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.settingsMenu",
  });

  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { signedIn, currentUser } = useCurrentUser();

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  const { navigateTo } = useNavigation();

  function onClickHandlerSignIn() {
    navigateTo("/auth/sign-in");
  }

  return (
    <>
      <ModalBlank
        visible={menuVisible}
        onClose={() => closeMenu()}
        customStyles={{
          overlay: {
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
            zIndex: `${theme.zindex.modal}`,
          },
          content: {
            border: `1px solid ${theme.colors.neutral[200]}`,
            paddingLeft: 16,
            paddingRight: 16,
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? "6%" : "10%",
            right: isMobile ? "" : "14%",
          },
        }}
      >
        <Item
          icon="account_circle"
          text={t("signInOrCreateAccount")}
          onClickHandler={() => onClickHandlerSignIn()}
        />

        <Item
          customIcon={MoreTicketsIcon}
          text={t("getTheApp")}
          onClickHandler={() => onClickHandlerSignIn()}
        />

        <Item
          icon="support_agent"
          text={t("userSupport.text")}
          onClickHandler={() => onClickHandlerSignIn()}
        />

        {currentUser?.lastDonationAt ? (
          <div>
            <Item
              icon="volunteer_activism"
              text={t("monthlyContributions")}
              onClickHandler={() => onClickHandlerSignIn()}
            />
          </div>
        ) : (
          <div />
        )}

        <ChangeLanguageItem />

        {signedIn ? (
          <div>
            <Divider color={theme.colors.neutral[200]} />
            <LogoutItem />
          </div>
        ) : (
          <div />
        )}
      </ModalBlank>
      <S.Settings
        name="settings"
        onClick={() => openMenu()}
        size="24px"
        color={
          outline ? theme.colors.neutral10 : theme.colors.brand.primary[600]
        }
      />
    </>
  );
}

export default SettingsMenu;
