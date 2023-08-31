import extractUrlValue from "lib/extractUrlValue";
import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export interface NavigationProps {
  pathname: string;
  search?: string;
  state?: Record<string, any>;
}

export default function useNavigation() {
  const history = useHistory();

  const utmSource = extractUrlValue("utm_source", history.location.search);
  const utmMedium = extractUrlValue("utm_medium", history.location.search);
  const utmCampaign = extractUrlValue("utm_campaign", history.location.search);
  
  const utmParams = `utm_source=${utmSource}&utm_medium=${utmMedium}&utm_campaign=${utmCampaign}`;

  const navigateTo = useCallback(
    (navigationProps: NavigationProps | string) => {
      if (typeof navigationProps === "string") {
        history.push({
          pathname: navigationProps,
          search: history.location.search,
          state: { from: history.location.pathname },
        });
      } else {
        const {
          pathname,
          search,
          state = { from: history.location.pathname },
        } = navigationProps;
        history.push({
          pathname,
          state,
          search: `${search}&${utmParams}` || history.location.search,
        });
      }
    },
    [history],
  );

  function navigateBack() {
    history.goBack();
  }

  const navigationObject = {
    navigateTo,
    navigateBack,
    history,
  };

  return navigationObject;
}
