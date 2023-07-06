import InlineNotification from "components/moleculars/Toasts/InlineNotification";
import { useTranslation } from "react-i18next";
import { setLocalStorageItem } from "lib/localStorage";
import useNavigation from "hooks/useNavigation";
import { logEvent } from "lib/events";

export const CONTRIBUTION_INLINE_NOTIFICATION =
  "CONTRIBUTION_INLINE_NOTIFICATION";
function ContributionNotification() {
  const { t } = useTranslation("translation", {
    keyPrefix: "contributionNotification",
  });

  const { navigateTo } = useNavigation();

  const currentRemainingViews = () =>
    parseInt(localStorage.getItem(CONTRIBUTION_INLINE_NOTIFICATION) || "0", 10);
  const handleHideNotificationClick = (setVisible: any) => {
    setVisible(false);
    setLocalStorageItem(CONTRIBUTION_INLINE_NOTIFICATION, "0");
    logEvent("contributionDashCta_Btn_click", {
      from: "donateTickets_page",
    });
    navigateTo({
      pathname: "/impact",
    });
  };

  const handleCloseClick = () => {
    const notificationRemaningViews = currentRemainingViews() - 1;
    setLocalStorageItem(
      CONTRIBUTION_INLINE_NOTIFICATION,
      notificationRemaningViews.toString(),
    );
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
