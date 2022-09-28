import { useCallback } from "react";
import { useHistory } from "react-router-dom";

export interface NavigationProps {
  pathname: string;
  search?: string;
  state?: Record<string, any>;
}

export default function useNavigation() {
  const history = useHistory();

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
          search: search || history.location.search,
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
