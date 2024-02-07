import { PLATFORM, RIBON_COMPANY_ID } from "utils/constants";

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
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import { useAuthentication } from "contexts/authenticationContext";
import { getLocalStorageItem, setLocalStorageItem } from "@ribon.io/shared/lib";

export function useTickets() {
  const { currentUser } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
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
  const { showReceiveTicketToast } = useReceiveTicketToast();

  function hasReceivedTicketToday() {
    const donationToastSeenAtKey = getLocalStorageItem(
      DONATION_TOAST_SEEN_AT_KEY,
    );
    const donationToastIntegration = getLocalStorageItem(
      DONATION_TOAST_INTEGRATION,
    );

    if (
      donationToastSeenAtKey &&
      donationToastIntegration === integrationId?.toLocaleString() &&
      externalIds?.length === 0
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

  async function receiveTicket() {
    const canCollect = await handleCanCollect();

    if (canCollect) {
      if (isAuthenticated()) {
        await handleCollect();
      }
    }
    if (canCollect && !hasReceivedTicketToday()) {
      showReceiveTicketToast();
      setLocalStorageItem(DONATION_TOAST_SEEN_AT_KEY, Date.now().toString());
      setLocalStorageItem(
        DONATION_TOAST_INTEGRATION,
        integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
      );
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    receiveTicket,
    hasReceivedTicketToday,
  };
}
