import ModalBlank from "components/moleculars/modals/ModalBlank";
import Header from "components/atomics/sections/Header";
import { useIntegration, useCanDonate } from "@ribon.io/shared/hooks";
import { useCurrentUser } from "contexts/currentUserContext";
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
import TicketsCounter from "layouts/LayoutHeader/TicketsCounter";
import Icon from "components/atomics/Icon";
import ChangeLanguageItem from "./ChangeLanguageItem";
import LogoutItem from "./LogoutItem";
import * as S from "./styles";
import UserSupportItem from "./UserSupportItem";
import GetTheAppItem from "./GetTheAppItem";

export type Props = {
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  hideWallet?: boolean;
  outline?: boolean;
};

function LayoutHeader({
  rightComponent,
  hasBackButton = false,
  hideWallet = false,
  outline = false,
}: Props): JSX.Element {
  const integrationId = useIntegrationId();
  const [menuVisible, setMenuVisible] = useState(false);
  const { isMobile } = useBreakpoint();
  const { signedIn } = useCurrentUser();
  const { navigateBack, history, navigateTo } = useNavigation();
  const { integration } = useIntegration(integrationId);
  const externalId = extractUrlValue("external_id", history.location.search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

  const { isVoucherAvailable } = useVoucher();

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  if (!integrationId) return <div />;

  function openMenu() {
    logEvent("configButton_click");
    setMenuVisible(true);
  }

  function closeMenu() {
    setMenuVisible(false);
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
    <S.Container outline={outline}>
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
                <TicketsCounter outline={outline} />

                <S.Settings>
                  <Icon
                    name="settings"
                    onClick={() => openMenu()}
                    size="24px"
                    color={
                      outline
                        ? theme.colors.neutral10
                        : theme.colors.brand.primary[600]
                    }
                  />
                </S.Settings>
              </S.ContainerButtons>
            )}
          </S.ContainerRight>
        }
      />
    </S.Container>
  );
}

export default LayoutHeader;
