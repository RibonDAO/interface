import { PLATFORM } from "utils/constants";
import { logError } from "services/crashReport";
import { setLocalStorageItem } from "lib/localStorage";
import { SHOW_MENU, useCurrentUser } from "contexts/currentUserContext";
import {
  useSources,
  useTickets,
  useUserConfig,
  useUsers,
} from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import { NonProfit } from "@ribon.io/shared/types";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";
import { normalizedLanguage } from "lib/currentLanguage";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";
import { useTicketsContext } from "contexts/ticketsContext";

type HandleDonateProps = {
  nonProfit: NonProfit;
  email: string;
  allowedEmailMarketing?: boolean;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};
function useDonationFlow() {
  const { signedIn, setCurrentUser } = useCurrentUser();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const integrationId = useIntegrationId();
  const { history, navigateTo } = useNavigation();
  const { destroyVoucher } = useVoucher();
  const { updateUserConfig } = useUserConfig();
  const { collectAndDonateByIntegration } = useTickets();
  const { refetchTickets } = useTicketsContext();

  async function handleDonate({
    nonProfit,
    email,
    allowedEmailMarketing,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    if (!signedIn) {
      const user = await findOrCreateUser(email, normalizedLanguage());
      if (integrationId) createSource(user.id, integrationId);
      setCurrentUser(user);
      if (allowedEmailMarketing) {
        updateUserConfig(user.id, { allowedEmailMarketing });
      }
    }

    const utmParams = getUTMFromLocationSearch(history.location.search);

    if (integrationId) {
      try {
        await collectAndDonateByIntegration(
          integrationId,
          nonProfit.id,
          email,
          PLATFORM,
          utmParams.utmSource,
          utmParams.utmMedium,
          utmParams.utmCampaign,
        );
        destroyVoucher();
        refetchTickets();
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

  return { handleDonate };
}

export default useDonationFlow;
