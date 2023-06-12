import {
  useFirstAccessToIntegration,
  useIntegration,
} from "@ribon.io/shared/hooks";
import Spinner from "components/atomics/Spinner";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as S from "./styles";

type LocationStateType = {
  comesFromReceiveTicketPage: boolean;
};

function LoadingPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { state } = useLocation<LocationStateType>();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const {
    isFirstAccessToIntegration,
    isLoading: isLoadingIsFirstAccessToIntegration,
  } = useFirstAccessToIntegration(integration?.id || integrationId);

  const renderOnboardingPage = () => {
    if (integration && !isLoadingIsFirstAccessToIntegration) {
      if (isFirstAccessToIntegration && !state?.comesFromReceiveTicketPage) {
        navigateTo("/give-ticket");
      } else {
        navigateTo("/causes");
      }
    }
  };

  useEffect(() => {
    if (integration && !isLoadingIsFirstAccessToIntegration) {
      renderOnboardingPage();
    }
  }, [integration, isLoadingIsFirstAccessToIntegration, integrationId, state]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
