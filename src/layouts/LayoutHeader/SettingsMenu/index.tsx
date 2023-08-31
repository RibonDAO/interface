import theme from "styles/theme";
import GetTheAppItem from "layouts/LayoutHeader/GetTheAppItem";
import { Divider } from "components/atomics/Divider/styles";
import UserSupportItem from "layouts/LayoutHeader/UserSupportItem";
import ChangeLanguageItem from "layouts/LayoutHeader/ChangeLanguageItem";
import LogoutItem from "layouts/LayoutHeader/LogoutItem";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import { useState } from "react";
import { logEvent } from "lib/events";
import useBreakpoint from "hooks/useBreakpoint";
import { useCurrentUser } from "contexts/currentUserContext";
import * as S from "./styles";

type Props = {
  outline?: boolean;
};
function SettingsMenu({ outline = false }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { signedIn } = useCurrentUser();

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
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
        <GetTheAppItem />
        <Divider color={theme.colors.neutral[200]} />
        <UserSupportItem />
        <Divider color={theme.colors.neutral[200]} />
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
