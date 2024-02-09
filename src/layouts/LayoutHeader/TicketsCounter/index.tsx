import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import TicketIconText from "components/moleculars/TicketIconText";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useTicketsContext } from "contexts/ticketsContext";

type Props = {
  outline?: boolean;
};

function TicketsCounter({ outline = false }: Props): JSX.Element {
  const { navigateTo } = useNavigation();
  const { ticketsCounter } = useTicketsContext();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const hasTicket = ticketsCounter > 0;

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
    <TicketIconText
      onClick={handleCounterClick}
      quantity={ticketsCounter}
      outline={outline}
    />
  );
}

export default TicketsCounter;
