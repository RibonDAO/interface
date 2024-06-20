import { logEvent } from "lib/events";
import useNavigation from "hooks/useNavigation";
import TicketIconText from "components/moleculars/TicketIconText";
import { useTicketsContext } from "contexts/ticketsContext";

type Props = {
  outline?: boolean;
};

function TicketsCounter({ outline = false }: Props): JSX.Element {
  const { ticketsCounter } = useTicketsContext();
  const { navigateTo } = useNavigation();

  const handleCounterClick = () => {
    logEvent("ticketIcon_click", { ticketQtd: 1 });
    navigateTo("/earn");
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
