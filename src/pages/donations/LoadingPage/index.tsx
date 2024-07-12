import { useIntegration } from "@ribon.io/shared/hooks";
import Spinner from "components/atomics/Spinner";
import { useIntegrationId } from "hooks/useIntegrationId";
import useNavigation from "hooks/useNavigation";
import { useEffect } from "react";
import { logEvent } from "lib/events";
import { useCouponContext } from "contexts/couponContext";
import {
  APP_INTEGRATION_LINK,
  APP_MAGIC_LINK,
  RIBON_COMPANY_ID,
} from "utils/constants";
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
  const authToken = extractUrlValue("authToken", history.location.search);
  const accountId = extractUrlValue("id", history.location.search);
  const { currentUser } = useCurrentUser();
  const { hasReceivedTicketToday, handleCollect } = useCollectTickets();
  const { showReceiveTicketToast } = useReceiveTicketToast();

  const redirectToDeeplink = () => {
    const externalIdParam = externalId
      ? `&external_id=${encodeURIComponent(externalId)}`
      : "";
    const couponIdParam = couponId ? `&coupon_id=${couponId}` : "";
    const authTokenParam = authToken ? `&authToken=${authToken}` : "";
    const accountIdParam = accountId ? `&id=${accountId}` : "";
    const utmParams = getUTMFromLocationSearch(history.location.search);
    const utmParamsString = utmParamsToString(utmParams);
    window.location.replace(
      `${
        authToken ? APP_MAGIC_LINK : APP_INTEGRATION_LINK
      }?integration_id=${integrationId}&${externalIdParam}&${couponIdParam}${utmParamsString}${authTokenParam}${accountIdParam}`,
    );
  };

  const collectFromRibon = async () => {
    await handleCollect({
      onSuccess: () => {
        logEvent("ticketCollected", { from: "collect" });
      },
    });

    showReceiveTicketToast();
    setLocalStorageItem(RECEIVED_TICKET_AT_KEY, Date.now().toString());
    setLocalStorageItem(
      RECEIVED_TICKET_FROM_INTEGRATION,
      integrationId?.toLocaleString() ?? RIBON_COMPANY_ID,
    );
  };

  const itIsNotDeeplink = () =>
    !history.location.search?.includes("_branch_match_id") &&
    integrationId &&
    !process.env.REACT_APP_DEBUG_VIEW;

  const hasCoupon = couponId !== "" && couponId !== undefined;

  async function receiveTicket() {
    try {
      const receivedTicketToday = await hasReceivedTicketToday();
      if (receivedTicketToday) return navigateTo("/causes");
      await collectFromRibon();
      return navigateTo("/causes");
    } catch (error) {
      logError(error);
      return navigateTo("/causes");
    }
  }

  async function redirectToCollect() {
    if (hasCoupon) {
      setCouponId(couponId);
      return navigateTo("/coupons/give-ticket");
    }
    if (!currentUser) return navigateTo("/intro");

    return receiveTicket();
  }

  useEffect(() => {
    if (integration) {
      localStorage.setItem("integrationName", integration.name);
      logEvent("P1_view");
      if (itIsNotDeeplink()) redirectToDeeplink();
      redirectToCollect();
    }
  }, [integration]);

  return (
    <S.Container>
      <Spinner size="26" />
    </S.Container>
  );
}

export default LoadingPage;
