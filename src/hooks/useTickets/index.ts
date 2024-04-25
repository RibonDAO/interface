import { PLATFORM } from "utils/constants";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets as useTicketShared } from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import extractUrlValue from "lib/extractUrlValue";
import { useLocation } from "react-router-dom";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import { getLocalStorageItem } from "lib/localStorage";
import { logError } from "services/crashReport";

type HandleCollectProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

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
    const receivedTicketAtKey = getLocalStorageItem(RECEIVED_TICKET_AT_KEY);
    const receivedTickedFromIntegrationKey = getLocalStorageItem(
      RECEIVED_TICKET_FROM_INTEGRATION,
    );

    if (
      receivedTicketAtKey &&
      receivedTickedFromIntegrationKey === integrationId?.toLocaleString()
    ) {
      const dateUserSawToast = new Date(parseInt(receivedTicketAtKey, 10));
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

  async function handleCollect({ onError, onSuccess }: HandleCollectProps) {
    try {
      if (externalIds && externalIds.length > 0 && integrationId) {
        await collectByExternalIds(
          externalIds,
          integrationId ?? "",
          PLATFORM,
          currentUser?.email ?? "",
        );
        if (onSuccess) onSuccess();
      } else if (integrationId) {
        await collectByIntegration(
          integrationId,
          PLATFORM,
          currentUser?.email ?? "",
        );
        if (onSuccess) onSuccess();
      }
    } catch (e: any) {
      logError(e);
      if (onError) onError(e);
    }
  }

  return {
    handleCanCollect,
    handleCollect,
    hasReceivedTicketToday,
  };
}
