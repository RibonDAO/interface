import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
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
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { useDonationTicketModal } from "hooks/modalHooks/useDonationTicketModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import LogoutItem from "./LogoutItem";
import * as S from "./styles";

export type Props = {
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
};

function LayoutHeader({
  rightComponent,
  hasBackButton = false,
}: Props): JSX.Element {
  const integrationId = useIntegrationId();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { userLastDonation, signedIn } = useCurrentUser();
  const { navigateBack } = useNavigation();
  const { showBlockedDonationModal } = useBlockedDonationModal();
  const { showDonationTicketModal } = useDonationTicketModal();

  if (!integrationId) return <div />;

  const { integration } = useIntegration(integrationId);

  function openMenu() {
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function hasDonateToday() {
    return userLastDonation === today();
  }

  function handleCounterClick() {
    if (hasDonateToday()) showBlockedDonationModal();
    else {
      showDonationTicketModal();
    }
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
        hasBackButton={hasBackButton}
        onBackButtonClick={navigateBack}
        sideLogo={integration?.logo}
        rightComponent={
          <S.ContainerRight>
            {rightComponent}
            <S.CounterContainer onClick={() => handleCounterClick()}>
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
