import { theme } from "@ribon.io/shared/styles";
import ticketIconOn from "assets/icons/ticket-icon-on.svg";
import ticketIconOff from "assets/icons/ticket-icon-off.svg";
import * as S from "./styles";

export type Props = {
  quantity: number;
  onClick?: () => void;
  buttonDisabled?: boolean;
};
function TicketIconText({
  quantity,
  onClick,
  buttonDisabled = false,
}: Props): JSX.Element {
  const hasTicket = quantity > 0;

  const ticketIcon = quantity > 0 ? ticketIconOn : ticketIconOff;

  return (
    <S.CounterContainer onClick={onClick} disabled={buttonDisabled}>
      <S.CounterImage src={ticketIcon} />
      <S.TicketsAmount
        color={
          hasTicket
            ? theme.colors.brand.primary[600]
            : theme.colors.neutral[500]
        }
      >
        {quantity}
      </S.TicketsAmount>
    </S.CounterContainer>
  );
}

export default TicketIconText;
