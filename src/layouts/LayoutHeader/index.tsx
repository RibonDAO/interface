import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import { useIntegration, useCanDonate } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
import cogIcon from "assets/icons/cog-icon.svg";
import ticketOn from "assets/icons/ticket-icon-on.svg";
import ticketOff from "assets/icons/ticket-icon-off.svg";
import useVoucher from "hooks/useVoucher";
import { useState } from "react";
import { Divider } from "components/atomics/Divider/styles";
import theme from "styles/theme";
import useBreakpoint from "hooks/useBreakpoint";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { PLATFORM, RIBON_COMPANY_ID } from "utils/constants";
import { logEvent, newLogEvent } from "lib/events";
import extractUrlValue from "lib/extractUrlValue";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import ChangeLanguageItem from "./ChangeLanguageItem";
import LogoutItem from "./LogoutItem";
import * as S from "./styles";
import UserSupportItem from "./UserSupportItem";
import GetTheAppItem from "./GetTheAppItem";
import MonthlyContributionsItem from "./MonthlyContributionsItem";

export type Props = {
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  hideWallet?: boolean;
};

const { primary } = theme.colors.brand;

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
  const externalId = extractUrlValue("external_id", history.location.search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

  const hasDonated = localStorage.getItem("HAS_DONATED") === "true";

  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  if (!integrationId) return <div />;

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
  }

  function handleCounterClick() {
    if (canDonateAndHasVoucher) {
      newLogEvent("click", "ticketIcon", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      newLogEvent("click", "ticketIcon", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  }

  function renderSideLogo() {
    if (integrationId?.toString() === RIBON_COMPANY_ID) return undefined;

    return integration?.logo;
  }

  function handleSideLogoClick() {
    if (!integration?.integrationTask?.linkAddress) return;
    if (canDonateAndHasVoucher) {
      navigateTo("return-to-integration");
      return;
    }

    newLogEvent("click", "backIntegration", { from: "header" });
    window.open(integration.integrationTask.linkAddress);
  }

  const onSideLogoClick = integration?.integrationTask?.linkAddress
    ? handleSideLogoClick
    : undefined;

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
        {hasDonated ? (
          <div>
            <Divider color={theme.colors.neutral[200]} />
            <MonthlyContributionsItem />
          </div>
        ) : (
          <div />
        )}

        {signedIn ? (
          <div>
            <Divider color={theme.colors.neutral[200]} />
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
        onSideLogoClick={onSideLogoClick}
        rightComponent={
          <S.ContainerRight>
            {rightComponent}
            {!hideWallet && (
              <S.ContainerButtons>
                <S.CounterContainer onClick={() => handleCounterClick()}>
                  <S.TicketsAmount
                    color={
                      canDonateAndHasVoucher
                        ? primary[600]
                        : theme.colors.neutral[500]
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
