import { PLATFORM } from "utils/constants";
import { logError } from "services/crashReport";
import { setLocalStorageItem } from "lib/localStorage";
import { SHOW_MENU, useCurrentUser } from "contexts/currentUserContext";
import {
  useSources,
  useTickets,
  useUsers,
  useUserTickets,
} from "@ribon.io/shared/hooks";
import { useIntegrationContext } from "contexts/integrationContext";
import { NonProfit } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";
import { normalizedLanguage } from "lib/currentLanguage";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import useDonateTickets from "hooks/apiHooks/useDonateTickets";
import { useAuthentication } from "contexts/authenticationContext";

type HandleCollectAndDonateProps = {
  nonProfit: NonProfit;
  email: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

type HandleDonateProps = {
  nonProfit: NonProfit;
  ticketsQuantity: number;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

function useDonationFlow() {
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { isAuthenticated } = useAuthentication();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { currentIntegrationId: integrationId } = useIntegrationContext();
  const { history, navigateTo } = useNavigation();
  const { destroyVoucher } = useVoucher();
  const { collectAndDonateByIntegration, collectAndDonateByExternalIds } =
    useTickets();
  const utmParams = getUTMFromLocationSearch(history.location.search);
  const { externalIds } = useIntegrationContext();

  async function handleCollectAndDonate({
    nonProfit,
    email,
    onError,
    onSuccess,
  }: HandleCollectAndDonateProps) {
    if (!signedIn) {
      const user = await findOrCreateUser(email, normalizedLanguage());
      if (integrationId) createSource(user.id, integrationId);
      setCurrentUser(user);
    }

    if (integrationId) {
      try {
        if (externalIds && externalIds.length > 0) {
          await collectAndDonateByExternalIds(
            integrationId,
            nonProfit.id,
            PLATFORM,
            externalIds,
            email,
            utmParams.utmSource,
            utmParams.utmMedium,
            utmParams.utmCampaign,
          );
        } else {
          await collectAndDonateByIntegration(
            integrationId,
            nonProfit.id,
            PLATFORM,
            email,
            utmParams.utmSource,
            utmParams.utmMedium,
            utmParams.utmCampaign,
          );
        }
        destroyVoucher();
        if (onSuccess) onSuccess();
      } catch (e: any) {
        logError(e);
        if (onError) onError(e);
        const failedKey =
          e.response?.status === 403 ? "blockedDonation" : "failedDonation";
        const newState = {
          [failedKey]: true,
          message: e.response?.data?.formatted_message || e.message,
        };
        navigateTo({ pathname: "/causes", state: newState });
        window.location.reload();
      }
    }
    setLocalStorageItem(SHOW_MENU, "true");
  }

  async function handleDonate({
    nonProfit,
    ticketsQuantity,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    const { donate: userDonate } = useUserTickets();
    const { donate: apiDonate } = useDonateTickets();

    try {
      if (isAuthenticated()) {
        const result = await userDonate(
          nonProfit.id,
          ticketsQuantity,
          PLATFORM,
          utmParams.utmSource,
          utmParams.utmMedium,
          utmParams.utmCampaign,
        );
        if (result?.status === 200 && onSuccess) onSuccess();
      } else {
        const result = await apiDonate(
          nonProfit.id,
          ticketsQuantity,
          PLATFORM,
          utmParams.utmSource,
          utmParams.utmMedium,
          utmParams.utmCampaign,
        );
        if (result?.status === 200 && onSuccess) onSuccess();
      }
    } catch (e: any) {
      logError(e);
      if (onError) onError(e);
    }
  }

  return { handleCollectAndDonate, handleDonate };
}

export default useDonationFlow;
