import { theme } from "@ribon.io/shared/styles";
import ticketOn from "assets/icons/ticket-icon-on.svg";
import ticketOff from "assets/icons/ticket-icon-off.svg";
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
  const canDonateAndHasVoucher = canDonate && isVoucherAvailable();
  const { showBlockedDonationContributionModal } =
    useBlockedDonationContributionModal();

  function handleCounterClick() {
    if (canDonateAndHasVoucher) {
      logEvent("ticketIcon_click", { ticketQtd: 1 });
      navigateTo("/tickets");
    } else {
      logEvent("ticketIcon_click", { ticketQtd: 0 });
      showBlockedDonationContributionModal();
    }
  }

  return (
    <S.CounterContainer onClick={() => handleCounterClick()} outline={outline}>
      <S.TicketsAmount
        color={
          canDonateAndHasVoucher
            ? theme.colors.brand.primary[300]
            : theme.colors.neutral[500]
        }
      >
        {canDonateAndHasVoucher ? 1 : 0}
      </S.TicketsAmount>
      <S.CounterImage src={canDonateAndHasVoucher ? ticketOn : ticketOff} />
    </S.CounterContainer>
  );
}

export default TicketsCounter;
