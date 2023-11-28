import { useTranslation } from "react-i18next";
import { logEvent } from "lib/events";
import { useSubscriptions } from "@ribon.io/shared/hooks";
import useNavigation from "hooks/useNavigation";
import Loader from "components/atomics/Loader";
import { useCurrentUser } from "contexts/currentUserContext";
import Item from "../Item";

function MonthlyContributions(): JSX.Element | null {
  const { t } = useTranslation("translation", {
    keyPrefix: "layouts.layoutHeader.settingsMenu",
  });

  const { navigateTo } = useNavigation();
  const { userSubscriptions } = useSubscriptions();
  const { isLoading, subscriptions } = userSubscriptions();
  const { currentUser } = useCurrentUser();

  const handleClick = () => {
    logEvent("manageSubs_click", {
      from: "configPage",
    });

    if (!currentUser) return navigateTo("/promoters/support-cause");

    if (isLoading) return <Loader />;

    if (subscriptions && subscriptions?.length > 0) {
      return navigateTo("/monthly-contributions");
    } else {
      return navigateTo("/promoters/support-cause");
    }
  };

  if (!currentUser?.lastDonationAt) return null;

  return (
    <Item
      icon={{ name: "volunteer_activism" }}
      text={t("monthlyContributions")}
      onClickHandler={() => handleClick()}
    />
  );
}

export default MonthlyContributions;
