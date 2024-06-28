import { PLATFORM } from "utils/constants";
import { useCurrentUser } from "contexts/currentUserContext";
import { useTickets } from "@ribon.io/shared/hooks";
import { useIntegrationContext } from "contexts/integrationContext";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { today } from "lib/dateTodayFormatter";
import { getLocalStorageItem } from "lib/localStorage";
import { logError } from "services/crashReport";
import { useIntegrationId } from "hooks/useIntegrationId";

type HandleCollectProps = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export function useCollectTickets() {
  const { currentUser } = useCurrentUser();

  const {
    canCollectByExternalIds,
    canCollectByIntegration,
    collectByExternalIds,
    collectByIntegration,
  } = useTickets();

  const integrationId = useIntegrationId();
  const { externalId, setExternalId } = useIntegrationContext();
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
      const { canCollect, quantity } = await canCollectByExternalIds(
        externalIds,
      );
      return { canCollect, quantity };
    } else if (integrationId) {
      const { canCollect } = await canCollectByIntegration(
        integrationId,
        currentUser?.email ?? "",
      );
      return { canCollect, quantity: 1 };
    } else {
      return { canCollect: false, quantity: 0 };
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
        if (onSuccess) {
          setExternalId(undefined);
          onSuccess();
        }
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
