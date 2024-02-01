import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import TicketIconText from "components/moleculars/TicketIconText";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useTicketsContext } from "contexts/ticketsContext";
import { useEffect } from "react";

function TicketsCounter(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { ticketsCounter, refetchTickets } = useTicketsContext();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const hasTicket = ticketsCounter > 0;

  useEffect(() => {
    refetchTickets();
  }, []);

  const handleCounterClick = () => {
    if (hasTicket) {
      logEvent("ticketIcon_click", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      logEvent("ticketIcon_click", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  };

  return (
    <TicketIconText onClick={handleCounterClick} quantity={ticketsCounter} />
  );
}

export default TicketsCounter;
