import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTickets } from "@ribon.io/shared/hooks";
import { useIntegrationContext } from "contexts/integrationContext";
import { useCurrentUser } from "contexts/currentUserContext";
import { useAuthentication } from "contexts/authenticationContext";
import { useCollectTickets } from "hooks/useCollectTickets";
import { logEvent } from "lib/events";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import { RIBON_COMPANY_ID } from "utils/constants";

export interface ITicketsContext {
  ticketsCounter: number;
  setTicketsCounter: (tickets: number) => void;
  refetchTickets: () => void;
  hasTickets: boolean;
  isLoading: boolean;
}

export type Props = {
  children: JSX.Element[] | JSX.Element;
};

export const TicketsContext = createContext<ITicketsContext>(
  {} as ITicketsContext,
);

function TicketsProvider({ children }: Props) {
  const { ticketsAvailable } = useTickets();
  const {
    tickets: userTickets,
    integrationTickets: userIntegrationTickets,
    refetch,
    isLoading,
  } = ticketsAvailable();
  const { currentIntegrationId: integrationId, ticketsFromIntegration } =
    useIntegrationContext();
  const { signedIn } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
  const { showReceiveTicketToast } = useReceiveTicketToast();
  const [ticketsCounter, setTicketsCounter] = useState<number>(1);

  const { handleCollect } = useCollectTickets();
  const hasTickets = ticketsCounter > 0;

  function updateTicketsCounterForLoggedInUser() {
    if (userIntegrationTickets !== undefined)
      setTicketsCounter(userIntegrationTickets);
  }

  function updateTicketsCounterForAuthenticatedUser() {
    if (userTickets !== undefined) setTicketsCounter(userTickets);
  }

  async function updateTicketsCounterForNotLoggedInUser() {
    setTicketsCounter(ticketsFromIntegration || 1);
  }

  async function collectTickets() {
    await handleCollect({
      onSuccess: () => {
        logEvent("ticketCollected", { from: "collect" });
        showReceiveTicketToast();
        setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
        setLocalStorageItem(
          RECEIVED_TICKET_FROM_INTEGRATION,
          integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
        );
      },
    });
    refetch();
  }

  function collectAndRefetchTickets() {
    if (signedIn) {
      collectTickets();
    } else {
      updateTicketsCounterForNotLoggedInUser();
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      updateTicketsCounterForAuthenticatedUser();
    } else {
      updateTicketsCounterForLoggedInUser();
    }
  }, [userTickets, userIntegrationTickets]);

  useEffect(() => {
    collectAndRefetchTickets();
  }, [integrationId, signedIn]);

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      ticketsCounter,
      setTicketsCounter,
      hasTickets,
      refetchTickets: refetch,
      isLoading,
    }),
    [ticketsCounter, isLoading, hasTickets],
  );

  return (
    <TicketsContext.Provider value={ticketsObject}>
      {children}
    </TicketsContext.Provider>
  );
}

export default TicketsProvider;

export const useTicketsContext = () => {
  const context = useContext(TicketsContext);

  if (!context) {
    throw new Error("useTicketsContext must be used within TicketsProvider");
  }

  return context;
};
