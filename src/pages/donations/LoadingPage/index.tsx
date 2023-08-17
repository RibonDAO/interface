import {
  useFirstAccessToIntegration,
  useIntegration,
} from "@ribon.io/shared/hooks";
import Spinner from "components/atomics/Spinner";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import * as S from "./styles";

function LoadingPage(): JSX.Element {
  const { navigateTo } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const {
    isFirstAccessToIntegration,
    isLoading: isLoadingIsFirstAccessToIntegration,
  } = useFirstAccessToIntegration(integrationId);

  useEffect(() => {
    if (integration) {
      localStorage.setItem("integrationName", integration.name);
      logEvent("P1_view");
    }
  }, [integration]);

  const renderOnboardingPage = () => {
    if (isFirstAccessToIntegration) {
      navigateTo({
        pathname: "/intro",
      });
    } else {
      navigateTo("/causes");
    }
  };

  useEffect(() => {
    if (integration && !isLoadingIsFirstAccessToIntegration) {
      renderOnboardingPage();
    }
  }, [integration, isLoadingIsFirstAccessToIntegration, integrationId]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
