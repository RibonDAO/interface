import Header from "components/atomics/sections/Header";
import { useIntegration, useCanDonate } from "@ribon.io/shared/hooks";
import useVoucher from "hooks/useVoucher";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { PLATFORM, RIBON_COMPANY_ID } from "utils/constants";
import { logEvent } from "lib/events";
import extractUrlValue from "lib/extractUrlValue";
import { useExperiment } from "@growthbook/growthbook-react";
import * as S from "./styles";
import ImpactedLivesCounter from "./ImpactedLivesCounter";
import TicketsCounter from "./TicketsCounter";
import SettingsMenu from "./SettingsMenu";

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
  const { navigateBack, history, navigateTo } = useNavigation();
  const { integration } = useIntegration(integrationId);
  const externalId = extractUrlValue("external_id", history.location.search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);

  const { isVoucherAvailable } = useVoucher();
  const { value: isInLifeBasedImpact } = useExperiment({
    key: "progression-test-first-stage",
    variations: [false, true],
  });

  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();

  if (!integrationId) return <div />;

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

    logEvent("backIntegration_click", { from: "header" });
    window.open(integration.integrationTask.linkAddress);
  }

  const onSideLogoClick = integration?.integrationTask?.linkAddress
    ? handleSideLogoClick
    : undefined;

  return (
    <S.Container outline={outline && isInLifeBasedImpact}>
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
                {isInLifeBasedImpact && (
                  <ImpactedLivesCounter outline={outline} />
                )}
                <TicketsCounter outline={isInLifeBasedImpact && outline} />
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
