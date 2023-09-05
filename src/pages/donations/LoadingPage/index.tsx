import {
  useFirstAccessToIntegration,
  useIntegration,
} from "@ribon.io/shared/hooks";
import Spinner from "components/atomics/Spinner";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { APP_INTEGRATION_LINK } from "utils/constants";
import * as S from "./styles";

function LoadingPage(): JSX.Element {
  const { navigateTo, history } = useNavigation();
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

  const redirectToDeeplink = () => {
    if (integrationId)
      window.location.replace(
        `${APP_INTEGRATION_LINK}?integration_id=${integrationId}`,
      );
  };
  const renderOnboardingPage = () => {
    if (integration && !isLoadingIsFirstAccessToIntegration)
      if (isFirstAccessToIntegration) {
        navigateTo({
          pathname: "/intro",
        });
      } else {
        navigateTo("/causes");
      }
  };

  useEffect(() => {
    if (
      history.location.search &&
      history.location.search.includes("_branch_match_id")
    )
      renderOnboardingPage();
    else redirectToDeeplink();
  }, [integrationId, isLoadingIsFirstAccessToIntegration, integrationId]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
