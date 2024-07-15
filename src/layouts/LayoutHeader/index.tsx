import Header from "components/atomics/sections/Header";
import { useIntegrationContext } from "contexts/integrationContext";
import useNavigation from "hooks/useNavigation";
import { RIBON_COMPANY_ID } from "utils/constants";
import { logEvent } from "lib/events";
import { useTicketsContext } from "contexts/ticketsContext";
import Avatar from "assets/images/avatar.svg";
import TicketsCounter from "./TicketsCounter";
import SettingsMenu from "./SettingsMenu";
import * as S from "./styles";

export type Props = {
  rightComponent?: JSX.Element;
  hasBackButton?: boolean;
  hideWallet?: boolean;
  outline?: boolean;
  clubMember?: boolean;
};

function LayoutHeader({
  rightComponent,
  hasBackButton = false,
  hideWallet = false,
  outline = false,
  clubMember = false,
}: Props): JSX.Element {
  const { currentIntegrationId: integrationId, integration } =
    useIntegrationContext();
  const { navigateBack, navigateTo } = useNavigation();

  const { hasTickets } = useTicketsContext();

  if (!integrationId) return <div />;

  function renderSideLogo() {
    if (integrationId?.toString() === RIBON_COMPANY_ID) return undefined;

    return integration?.logo || Avatar;
  }

  function handleSideLogoClick() {
    if (!integration?.integrationTask?.linkAddress) return;
    if (hasTickets) {
      navigateTo("return-to-integration");
      return;
    }

    logEvent("backIntegration_click", { from: "header" });
    window.open(integration.integrationTask.linkAddress);
  }

  const onSideLogoClick = integration?.integrationTask?.linkAddress
    ? handleSideLogoClick
    : undefined;

  return (
    <S.Container outline={outline} clubMember={clubMember}>
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
                <SettingsMenu outline={outline} />
              </S.ContainerButtons>
            )}
          </S.ContainerRight>
        }
      />
    </S.Container>
  );
}

export default LayoutHeader;
