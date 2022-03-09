import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import useQueryParams from "hooks/useQueryParams";
import useIntegration from "hooks/apiHooks/useIntegration";
import cogIcon from "assets/icons/cog-icon.svg";
import { useState } from "react";
import theme from "styles/theme";
import useBreakpoint from "hooks/useBreakpoint";
import * as S from "./styles";
import ChangeLanguageItem from "./ChangeLanguageItem";

function LayoutHeader(): JSX.Element {
  const queryParams = useQueryParams();
  const integrationId = queryParams.get("integration_id");
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();

  if (!integrationId) return <div />;

  const { integration } = useIntegration(parseInt(integrationId, 10));

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  return (
    <S.Container>
      <ModalBlank
        visible={menuVisible}
        onClose={() => closeMenu()}
        customStyles={{
          overlay: {
            backgroundColor: "transparent",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "flex-end",
          },
          content: {
            border: `1px solid ${theme.colors.lightGray}`,
            paddingLeft: 8,
            paddingRight: 8,
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? "5%" : "8%",
            right: isMobile ? "" : "14%",
          },
        }}
      >
        <ChangeLanguageItem />
      </ModalBlank>
      <Header
        sideLogo={integration?.logo}
        rightComponent={<S.Settings onClick={() => openMenu()} src={cogIcon} />}
      />
    </S.Container>
  );
}

export default LayoutHeader;
