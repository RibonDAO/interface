import { theme } from "@ribon.io/shared/styles";
import ticketIconOn from "assets/icons/ticket-icon-on.svg";
import ticketIconOff from "assets/icons/ticket-icon-off.svg";
import ticketIconOutline from "assets/icons/ticket-icon-outline.svg";
import { logEvent } from "lib/events";
import { useUserTickets } from "@ribon.io/shared/hooks";

import useNavigation from "hooks/useNavigation";

import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useEffect, useState } from "react";
import * as S from "./styles";

type Props = {
  outline?: boolean;
};
function TicketsCounter({ outline = false }: Props): JSX.Element {
  const { navigateTo } = useNavigation();

  const { ticketsAvailable } = useUserTickets();
  const { tickets, refetch } = ticketsAvailable();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();
  const [ticketsCounter, setTicketsCounter] = useState(0);

  const hasTicket = ticketsCounter > 0;

  function handleCounterClick() {
    if (hasTicket) {
      logEvent("ticketIcon_click", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      logEvent("ticketIcon_click", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  }

  useEffect(() => {
    refetch();

    setTicketsCounter(tickets ?? 1);
  }, [tickets]);

  const ticketIcon = ticketsCounter > 0 ? ticketIconOn : ticketIconOff;

  return (
    <S.CounterContainer onClick={() => handleCounterClick()}>
      <S.CounterImage src={outline ? ticketIconOutline : ticketIcon} />
      <S.TicketsAmount
        color={
          hasTicket
            ? theme.colors.brand.primary[600]
            : theme.colors.neutral[500]
        }
      >
        {ticketsCounter}
      </S.TicketsAmount>
    </S.CounterContainer>
  );
}

export default TicketsCounter;
