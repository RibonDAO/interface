import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import useIntegration from "hooks/apiHooks/useIntegration";
import { useCurrentUser } from "contexts/currentUserContext";
import cogIcon from "assets/icons/cog-icon.svg";
import ticketOn from "assets/icons/ticket-icon-on.svg";
import ticketOff from "assets/icons/ticket-icon-off.svg";
import Ticket from "assets/images/ticket.svg";
import { useTranslation } from "react-i18next";
import useVoucher from "hooks/useVoucher";
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
import UserSupportItem from "./UserSupportItem";

export type Props = {
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  hideWallet?: boolean;
};

const { primary } = theme.colors.brand

function LayoutHeader({
  rightComponent,
  hasBackButton = false,
  hideWallet = false,
}: Props): JSX.Element {
  const integrationId = useIntegrationId();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { signedIn } = useCurrentUser();
  const { navigateBack, history, navigateTo } = useNavigation();
  const { integration } = useIntegration(integrationId);
  const { showBlockedDonationModal } = useBlockedDonationModal(
    undefined,
    integration,
  );
  const { canDonate } = useCanDonate(integrationId);
  const { isVoucherAvailable } = useVoucher();

  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader",
  });

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  const { show, hide } = useModal({
    type: MODAL_TYPES.MODAL_ICON,
    props: {
      title: t("donationModalTitle"),
      body: t("donationModalBody"),
      primaryButtonText: t("donationModalButtonText"),
      primaryButtonCallback: () => {
        if (history.location.pathname === "/") {
          hide();
        } else {
          navigateTo("/");
          hide();
        }
      },
      onClose: () => hide(),
      icon: Ticket,
    },
  });

  if (!integrationId) return <div />;

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function handleCounterClick() {
    if (canDonateAndHasVoucher) show();
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
            zIndex: `${theme.zindex.modal}`,
          },
          content: {
            border: `1px solid ${theme.colors.gray20}`,
            paddingLeft: 16,
            paddingRight: 16,
            position: isMobile ? "relative" : "absolute",
            top: isMobile ? "6%" : "10%",
            right: isMobile ? "" : "14%",
          },
        }}
      >
        <ChangeLanguageItem />
        <Divider color={theme.colors.gray20} />
        <UserSupportItem />

        {signedIn ? (
          <div>
            <Divider color={theme.colors.gray20} />
            <LogoutItem />
          </div>
        ) : (
          <div />
        )}
      </ModalBlank>
      <Header
        hasBackButton={hasBackButton}
        onBackButtonClick={navigateBack}
        sideLogo={renderSideLogo()}
        rightComponent={
          <S.ContainerRight>
            {rightComponent}
            {!hideWallet && (
              <S.ContainerButtons>
                <S.CounterContainer onClick={() => handleCounterClick()}>
                  <S.TicketsAmount
                    color={
                      canDonateAndHasVoucher
                        ? primary.colorBrandPrimary300
                        : theme.colors.gray30
                    }
                  >
                    {canDonateAndHasVoucher ? 1 : 0}
                  </S.TicketsAmount>
                  <S.CounterImage
                    src={canDonateAndHasVoucher ? ticketOn : ticketOff}
                  />
                </S.CounterContainer>

                <S.Settings onClick={() => openMenu()} src={cogIcon} />
              </S.ContainerButtons>
            )}
          </S.ContainerRight>
        }
      />
    </S.Container>
  );
}

export default LayoutHeader;
