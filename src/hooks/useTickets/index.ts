import { PLATFORM } from "utils/constants";

import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets as useTicketShared } from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";

import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router-dom";

import {
  DONATION_TOAST_INTEGRATION,
  DONATION_TOAST_SEEN_AT_KEY,
} from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";

import { getLocalStorageItem } from "lib/localStorage";

export function useTickets() {
  const { currentUser } = useCurrentUser();

  const {
    canCollectByExternalIds,
    canCollectByIntegration,
    collectByExternalIds,
    collectByIntegration,
  } = useTicketShared();

  const { search } = useLocation();
  const externalId = extractUrlValue("external_id", search);
  const integrationId = useIntegrationId();
  const externalIds = externalId?.split(",");

  function hasReceivedTicketToday() {
    const donationToastSeenAtKey = getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );
    const donationToastIntegration = getLocalStorageItem(
      DONATION_TOAST_INTEGRATION,
    );

    if (
      donationToastSeenAtKey &&
      donationToastIntegration === integrationId?.toLocaleString()
    ) {
      const dateUserSawToast = new Date(parseInt(donationToastSeenAtKey, 10));
      return dateUserSawToast.toLocaleDateString() === today();
    }
    return false;
  }

  async function handleCanCollect() {
    if (externalIds && externalIds.length > 0) {
      const { canCollect } = await canCollectByExternalIds(externalIds);
      return canCollect;
    } else if (integrationId) {
      const { canCollect } = await canCollectByIntegration(
        integrationId,
        currentUser?.email ?? "",
      );
      return canCollect;
    } else {
      return false;
    }
  }

  async function handleCollect() {
    if (externalIds && externalIds.length > 0 && integrationId) {
      await collectByExternalIds(
        externalIds,
        integrationId ?? "",
        PLATFORM,
        currentUser?.email ?? "",
      );
    } else if (integrationId) {
      await collectByIntegration(
        integrationId,
        PLATFORM,
        currentUser?.email ?? "",
      );
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    hasReceivedTicketToday,
  };
}
