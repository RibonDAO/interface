import { useIntegration } from "@ribon.io/shared/hooks";
import Spinner from "components/atomics/Spinner";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { useCouponContext } from "contexts/couponContext";
import { APP_INTEGRATION_LINK, RIBON_COMPANY_ID } from "utils/constants";
import extractUrlValue from "lib/extractUrlValue";
import {
  getUTMFromLocationSearch,
  utmParamsToString,
} from "lib/getUTMFromLocationSearch";
import { useCurrentUser } from "contexts/currentUserContext";
import { useCollectTickets } from "hooks/useCollectTickets";
import { logError } from "services/crashReport";
import { useReceiveTicketToast } from "hooks/toastHooks/useReceiveTicketToast";
import { setLocalStorageItem } from "lib/localStorage";
import {
  RECEIVED_TICKET_AT_KEY,
  RECEIVED_TICKET_FROM_INTEGRATION,
} from "lib/localStorage/constants";
import * as S from "./styles";

function LoadingPage(): JSX.Element {
  const { navigateTo, history } = useNavigation();
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const { setCouponId } = useCouponContext();
  const externalId = extractUrlValue("external_id", history.location.search);
  const couponId = extractUrlValue("coupon_id", history.location.search);
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCanCollect, handleCollect } =
    useCollectTickets();
  const { showReceiveTicketToast } = useReceiveTicketToast();

  const redirectToDeeplink = () => {
    const externalIdParam = externalId ? `&external_id=${externalId}` : "";
    const couponIdParam = couponId ? `&coupon_id=${couponId}` : "";
    const utmParams = getUTMFromLocationSearch(history.location.search);
    const utmParamsString = utmParamsToString(utmParams);
    window.location.replace(
      `${APP_INTEGRATION_LINK}?integration_id=${integrationId}&${externalIdParam}&${couponIdParam}${utmParamsString}`,
    );
  };

  async function receiveTicket() {
    if (
      !history.location.search?.includes("_branch_match_id") &&
      integrationId &&
      !process.env.REACT_APP_DEBUG_VIEW
    )
      redirectToDeeplink();
    else {
      try {
        const isRibonIntegration =
          integration?.id === parseInt(RIBON_COMPANY_ID, 10);
        const canCollect = await handleCanCollect();
        const receivedTicketToday = await hasReceivedTicketToday();

        if (couponId !== "" && couponId !== undefined) {
          setCouponId(couponId);
          navigateTo("/coupons/give-ticket");
        } else if (canCollect) {
          if (currentUser && externalId) {
            navigateTo("/intro/receive-tickets");
          } else if (currentUser && !receivedTicketToday) {
            if (!isRibonIntegration) {
              navigateTo("/intro/receive-tickets");
            } else {
              await handleCollect({
                onSuccess: () => {
                  logEvent("ticketCollected", { from: "collect" });
                },
              });

              showReceiveTicketToast();
              setLocalStorageItem(
                RECEIVED_TICKET_AT_KEY,
                Date.now().toString(),
              );
              setLocalStorageItem(
                RECEIVED_TICKET_FROM_INTEGRATION,
                integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
              );
              navigateTo("/causes");
            }
          } else if (!currentUser) {
            navigateTo("/intro");
          } else {
            navigateTo("/causes");
          }
        } else {
          navigateTo("/causes");
        }
      } catch (error) {
        logError(error);
      }
    }
  }

  useEffect(() => {
    if (integration) {
      localStorage.setItem("integrationName", integration.name);
      logEvent("P1_view");
    }
    receiveTicket();
  }, [integration]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
