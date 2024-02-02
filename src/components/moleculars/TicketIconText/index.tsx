import { theme } from "@ribon.io/shared/styles";
import ticketIconOn from "assets/icons/ticket-icon-on.svg";
import ticketIconOff from "assets/icons/ticket-icon-off.svg";
import ticketIconOutline from "assets/icons/ticket-icon-outline.svg";
import * as S from "./styles";

export type Props = {
  quantity: number;
  onClick?: () => void;
  buttonDisabled?: boolean;
  outline?: boolean;
};
function TicketIconText({
  quantity,
  onClick,
  buttonDisabled = false,
  outline = false,
}: Props): JSX.Element {
  const hasTicket = quantity > 0;

  const ticketIcon = quantity > 0 ? ticketIconOn : ticketIconOff;
  const ticketsTextColor = hasTicket
    ? theme.colors.brand.primary[600]
    : theme.colors.neutral[500];
  return (
    <S.CounterContainer onClick={onClick} disabled={buttonDisabled}>
      <S.CounterImage src={outline ? ticketIconOutline : ticketIcon} />
      <S.TicketsAmount
        color={outline ? theme.colors.neutral10 : ticketsTextColor}
      >
        {quantity}
      </S.TicketsAmount>
    </S.CounterContainer>
  );
}

export default TicketIconText;
