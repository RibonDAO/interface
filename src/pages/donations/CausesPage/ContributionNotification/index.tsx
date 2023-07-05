import InlineNotification from "components/moleculars/Toasts/InlineNotification";
import { useTranslation } from "react-i18next";
import { setLocalStorageItem } from "lib/localStorage";
import useNavigation from "hooks/useNavigation";

export const REMAINING_VIEWS = "CONTRIBUTION_NOTIFICATION_REMAINING_VIEWS";
function ContributionNotification() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionNotification",
  });

  const { navigateTo } = useNavigation();

  const currentRemainingViews = () =>
    parseInt(localStorage.getItem(REMAINING_VIEWS) || "0", 10);
  const handleHideNotificationClick = (setVisible: any) => {
    setVisible(false);
    setLocalStorageItem(REMAINING_VIEWS, "0");
    navigateTo({
      pathname: "/contribution-stats/173",
    });
  };

  const handleCloseClick = () => {
    const notificationRemaningViews = currentRemainingViews() - 1;
    setLocalStorageItem(REMAINING_VIEWS, notificationRemaningViews.toString());
  };

  if (currentRemainingViews() === 0) return null;

  return (
    <InlineNotification
      title={t("title")}
      description={t("description")}
      type="success"
      firstLink={t("link")}
      onFirstLinkClick={handleHideNotificationClick}
      onCloseClick={handleCloseClick}
    />
  );
}

export default ContributionNotification;
