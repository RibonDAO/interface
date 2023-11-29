import { theme } from "@ribon.io/shared/styles";
import ticketIconOn from "assets/icons/ticket-icon-on.svg";
import ticketIconOff from "assets/icons/ticket-icon-off.svg";
import ticketIconOutline from "assets/icons/ticket-icon-outline.svg";
import { logEvent } from "lib/events";
import { useCanDonate } from "@ribon.io/shared/hooks";
import { PLATFORM } from "utils/constants";
import useNavigation from "hooks/useNavigation";
import { useBlockedDonationContributionModal } from "hooks/modalHooks/useBlockedDonationContributionModal";
import useVoucher from "hooks/useVoucher";
import { useIntegrationId } from "hooks/useIntegrationId";
import extractUrlValue from "lib/extractUrlValue";
import * as S from "./styles";

type Props = {
  outline?: boolean;
};
function TicketsCounter({ outline = false }: Props): JSX.Element {
  const { navigateTo, history } = useNavigation();
  const { isVoucherAvailable } = useVoucher();
  const integrationId = useIntegrationId();
  const externalId = extractUrlValue("external_id", history.location.search);
  const { canDonate } = useCanDonate(integrationId, PLATFORM, externalId);
  const canDonateAndHasTicket = canDonate && isVoucherAvailable();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  function handleCounterClick() {
    if (canDonateAndHasTicket) {
      logEvent("ticketIcon_click", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      logEvent("ticketIcon_click", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  }

  const ticketIcon = canDonateAndHasTicket ? ticketIconOn : ticketIconOff;

  return (
    <S.CounterContainer onClick={() => handleCounterClick()} outline={outline}>
      <S.TicketsAmount
        outline={outline}
        color={
          canDonateAndHasTicket
            ? theme.colors.brand.primary[600]
            : theme.colors.neutral[500]
        }
      >
        {canDonateAndHasTicket ? 1 : 0}
      </S.TicketsAmount>
      <S.CounterImage src={outline ? ticketIconOutline : ticketIcon} />
    </S.CounterContainer>
  );
}

export default TicketsCounter;
