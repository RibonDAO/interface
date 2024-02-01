import { theme } from "@ribon.io/shared/styles";
import ticketIconOn from "assets/icons/ticket-icon-on.svg";
import ticketIconOff from "assets/icons/ticket-icon-off.svg";
import { logEvent } from "lib/events";

import useNavigation from "hooks/useNavigation";

import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import { useTicketsContext } from "contexts/ticketsContext";
import { useEffect } from "react";
import * as S from "./styles";

function TicketsCounter(): JSX.Element {
  const { navigateTo } = useNavigation();
  const { ticketsCounter, refetchTickets } = useTicketsContext();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  const hasTicket = ticketsCounter > 0;

  useEffect(() => {
    refetchTickets();
  }, []);

  function handleCounterClick() {
    if (hasTicket) {
      logEvent("ticketIcon_click", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      logEvent("ticketIcon_click", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  }

  const ticketIcon = ticketsCounter > 0 ? ticketIconOn : ticketIconOff;

  return (
    <S.CounterContainer onClick={() => handleCounterClick()}>
      <S.CounterImage src={ticketIcon} />
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
