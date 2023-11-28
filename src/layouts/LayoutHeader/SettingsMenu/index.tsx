import theme from "styles/theme";
import ChangeLanguage from "layouts/LayoutHeader/SettingsMenu/ChangeLanguage";
import Logout from "layouts/LayoutHeader/SettingsMenu/Logout";
import ModalBlank from "components/moleculars/modals/ModalBlank";
import { useState } from "react";
import { logEvent } from "lib/events";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";
import SignInOrCreateAccount from "./SignInOrCreateAccount";
import GetTheApp from "./GetTheApp";
import UserSupport from "./UserSupport";
import DeleteAccount from "./DeleteAccount";

type Props = {
  outline?: boolean;
};
function SettingsMenu({ outline = false }: Props) {
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  const closeMenu = () => {
    setMenuVisible(false);
  };

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
        <SignInOrCreateAccount />
        <GetTheApp />
        <UserSupport />
        <ChangeLanguage />
        <Logout closeMenu={closeMenu} />
        <DeleteAccount />
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
