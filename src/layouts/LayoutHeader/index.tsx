import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import useQueryParams from "hooks/useQueryParams";
import useIntegration from "hooks/apiHooks/useIntegration";
import { useCurrentUser } from "contexts/currentUserContext";
import { today } from "lib/dateTodayFormatter";
import cogIcon from "assets/icons/cog-icon.svg";
import ticketOn from "assets/icons/ticket-icon-on.svg";
import ticketOff from "assets/icons/ticket-icon-off.svg";
import { useState } from "react";
import { Divider } from "components/atomics/Divider/styles";
import theme from "styles/theme";
import useBreakpoint from "hooks/useBreakpoint";
import ChangeLanguageItem from "./ChangeLanguageItem";
import LogoutItem from "./LogoutItem";
import * as S from "./styles";

export type Props = {
  rightComponent?: JSX.Element;
};

function LayoutHeader({ rightComponent }: Props): JSX.Element {
  const queryParams = useQueryParams();
  const integrationId = queryParams.get("integration_id");
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { userLastDonation, signedIn } = useCurrentUser();

  if (!integrationId) return <div />;

  const { integration } = useIntegration(parseInt(integrationId, 10));

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function hasDonateToday() {
    return userLastDonation === today();
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
        <Divider color={theme.colors.lightGray} />
        {signedIn ? <LogoutItem /> : <div />}
      </ModalBlank>
      <Header
        sideLogo={integration?.logo}
        rightComponent={
          <S.ContainerRight>
            {rightComponent}
            <S.CounterContainer>
              <S.TicketsAmount
                color={
                  hasDonateToday()
                    ? theme.colors.darkGray
                    : theme.colors.ribonBlue
                }
              >
                {hasDonateToday() ? 0 : 1}
              </S.TicketsAmount>
              <S.CounterImage src={hasDonateToday() ? ticketOff : ticketOn} />
            </S.CounterContainer>
            <S.Settings onClick={() => openMenu()} src={cogIcon} />
          </S.ContainerRight>
        }
      />
    </S.Container>
  );
}

export default LayoutHeader;
