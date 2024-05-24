import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useTickets } from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import { useCurrentUser } from "contexts/currentUserContext";
import { logError } from "services/crashReport";
import { useAuthentication } from "contexts/authenticationContext";
import { useCollectTickets } from "hooks/useCollectTickets";

export interface ITicketsContext {
  ticketsCounter: number;
  setTicketsCounter: (tickets: number) => void;
  refetchTickets: () => void;
  hasTickets: boolean;
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
  } = ticketsAvailable();
  const integrationId = useIntegrationId();
  const { currentUser } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
  const [ticketsCounter, setTicketsCounter] = useState<number>(1);

  const { handleCanCollect } = useCollectTickets();
  const hasTickets = ticketsCounter > 0;

  function updateTicketsCounterForLoggedInUser() {
    if (userIntegrationTickets !== undefined)
      setTicketsCounter(userIntegrationTickets);
  }

  function updateTicketsCounterForAuthenticatedUser() {
    if (userTickets !== undefined) setTicketsCounter(userTickets);
  }

  async function updateTicketsCounterForNotLoggedInUser() {
    try {
      if (!currentUser) {
        const canCollect = await handleCanCollect();
        if (!canCollect) {
          setTicketsCounter(0);
        } else {
          setTicketsCounter(1);
        }
      }
    } catch (error) {
      logError(error);
    }
  }

  useEffect(() => {
    if (isAuthenticated()) {
      updateTicketsCounterForAuthenticatedUser();
    } else {
      updateTicketsCounterForLoggedInUser();
    }
  }, [userTickets, userIntegrationTickets, currentUser]);

  useEffect(() => {
    refetch();
    updateTicketsCounterForNotLoggedInUser();
  }, [integrationId, currentUser]);

  const ticketsObject: ITicketsContext = useMemo(
    () => ({
      ticketsCounter,
      setTicketsCounter,
      hasTickets,
      refetchTickets: refetch,
    }),
    [ticketsCounter],
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
