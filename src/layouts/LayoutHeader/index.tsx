import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import useIntegration from "hooks/apiHooks/useIntegration";
import { useCurrentUser } from "contexts/currentUserContext";
import cogIcon from "assets/icons/cog-icon.svg";
import ticketOn from "assets/icons/ticket-icon-on.svg";
import ticketOff from "assets/icons/ticket-icon-off.svg";
import Ticket from "assets/images/ticket.svg";
import { useTranslation } from "react-i18next";
import { MODAL_TYPES } from "contexts/modalContext/helpers";
import { useState } from "react";
import { Divider } from "components/atomics/Divider/styles";
import theme from "styles/theme";
import useBreakpoint from "hooks/useBreakpoint";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useBlockedDonationModal } from "hooks/modalHooks/useBlockedDonationModal";
import { RIBON_COMPANY_ID } from "utils/constants";
import { logEvent } from "services/analytics";
import { useModal } from "hooks/modalHooks/useModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import LogoutItem from "./LogoutItem";
import * as S from "./styles";
import useCanDonate from "../../hooks/apiHooks/useCanDonate";

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
  const { signedIn } = useCurrentUser();
  const { navigateBack } = useNavigation();
  const { showBlockedDonationModal } = useBlockedDonationModal();
  const { canDonate } = useCanDonate(integrationId);

  const { t } = useTranslation("translation", {
    keyPrefix: "donations.causesPage",
  });

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("donationModalTitle"),
      primaryButtonText: t("donationModalButtonText"),
      primaryButtonCallback: () => {
        hide();
      },
      onClose: () => hide,
      icon: Ticket,
    },
  });

  if (!integrationId) return <div />;

  const { integration } = useIntegration(integrationId);

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function handleCounterClick() {
    if (canDonate) show();
    else {
      showBlockedDonationModal();
    }
  }

  function renderSideLogo() {
    if (integrationId?.toString() === RIBON_COMPANY_ID) return undefined;

    return integration?.logo;
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
            paddingLeft: 16,
            paddingRight: 16,
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
        sideLogo={renderSideLogo()}
        rightComponent={
          <S.ContainerRight>
            {rightComponent}
            <S.CounterContainer onClick={() => handleCounterClick()}>
              <S.TicketsAmount
                color={
                  canDonate ? theme.colors.ribonBlue : theme.colors.darkGray
                }
              >
                {canDonate ? 1 : 0}
              </S.TicketsAmount>
              <S.CounterImage src={canDonate ? ticketOn : ticketOff} />
            </S.CounterContainer>
            <S.Settings onClick={() => openMenu()} src={cogIcon} />
          </S.ContainerRight>
        }
      />
    </S.Container>
  );
}

export default LayoutHeader;
