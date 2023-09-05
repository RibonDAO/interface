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
import extractUrlValue from "lib/extractUrlValue";
import {
  getUTMFromLocationSearch,
  utmParamsToString,
} from "lib/getUTMFromLocationSearch";
import * as S from "./styles";

function LoadingPage(): JSX.Element {
  const { navigateTo, history } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const {
    isFirstAccessToIntegration,
    isLoading: isLoadingIsFirstAccessToIntegration,
  } = useFirstAccessToIntegration(integrationId);
  const externalId = extractUrlValue("external_id", history.location.search);

  useEffect(() => {
    if (integration) {
      localStorage.setItem("integrationName", integration.name);
      logEvent("P1_view");
    }
  }, [integration]);

  const redirectToDeeplink = () => {
    const externalIdParam = externalId ? `&external_id=${externalId}` : "";
    const utmParams = getUTMFromLocationSearch(history.location.search);
    const utmParamsString = utmParamsToString(utmParams);
    window.location.replace(
      `${APP_INTEGRATION_LINK}?integration_id=${integrationId}&${externalIdParam}${utmParamsString}`,
    );
  };
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
    if (!history.location.search?.includes("_branch_match_id") && integrationId)
      redirectToDeeplink();
  }, [integrationId]);

  useEffect(() => {
    if (integration && !isLoadingIsFirstAccessToIntegration)
      renderOnboardingPage();
  }, [isLoadingIsFirstAccessToIntegration, integration]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
