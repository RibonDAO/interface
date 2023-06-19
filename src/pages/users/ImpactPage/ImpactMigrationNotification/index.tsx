import InlineNotification from "components/moleculars/Toasts/InlineNotification";
import { useTranslation } from "react-i18next";
import { setLocalStorageItem } from "lib/localStorage";

export const IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT =
  "IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT";
function ImpactMigrationNotification() {
  const { t } = useTranslation("translation", {
    keyPrefix: "impactPage",
  });

  const currentNotificationSeenCount = () =>
    parseInt(
      localStorage.getItem(IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT) || "0",
      10,
    );
  const handleHideNotificationClick = (setVisible: any) => {
    setVisible(false);
    setLocalStorageItem(IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT, "3");
  };

  const handleCloseClick = () => {
    const notificationsSeenCount = currentNotificationSeenCount() + 1;
    setLocalStorageItem(
      IMPACT_MIGRATION_NOTIFICATION_SEEN_COUNT,
      notificationsSeenCount.toString(),
    );
  };

  if (currentNotificationSeenCount() >= 3) return null;

  return (
    <InlineNotification
      title={t("impactNotification.title")}
      description={t("impactNotification.description")}
      type="success"
      firstLink={t("impactNotification.link")}
      onFirstLinkClick={handleHideNotificationClick}
      onCloseClick={handleCloseClick}
    />
  );
}

export default ImpactMigrationNotification;
