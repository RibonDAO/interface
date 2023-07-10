import { PLATFORM } from "utils/constants";
import { logError } from "services/crashReport";
import { setLocalStorageItem } from "lib/localStorage";
import { SHOW_MENU, useCurrentUser } from "contexts/currentUserContext";
import {
  useDonations,
  useIntegration,
  useSources,
  useUsers,
} from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import { NonProfit } from "@ribon.io/shared/types";
import extractUrlValue from "lib/extractUrlValue";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";
import { normalizedLanguage } from "lib/currentLanguage";

type HandleDonateProps = {
  nonProfit: NonProfit;
  email: string;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};
function useDonationFlow() {
  const { currentUser, signedIn, setCurrentUser } = useCurrentUser();
  const { findOrCreateUser } = useUsers();
  const { createSource } = useSources();
  const { donate } = useDonations(currentUser?.id);
  const integrationId = useIntegrationId();
  const { integration } = useIntegration(integrationId);
  const { history, navigateTo } = useNavigation();
  const { destroyVoucher } = useVoucher();

  function getExternalIdFromLocationSearch() {
    return extractUrlValue("external_id", history.location.search);
  }
  async function handleDonate({
    nonProfit,
    email,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    if (!signedIn) {
      const user = await findOrCreateUser(email, normalizedLanguage());
      if (integration) createSource(user.id, integration.id);
      setCurrentUser(user);
    }
    if (integration) {
      try {
        await donate(
          integration?.id,
          nonProfit.id,
          email,
          PLATFORM,
          getExternalIdFromLocationSearch(),
        );
        destroyVoucher();
        if (onSuccess) onSuccess();
      } catch (e: any) {
        logError(e);
        if (onError) onError(e);
        const failedKey =
          e.response.status === 403 ? "blockedDonation" : "failedDonation";
        const newState = {
          [failedKey]: true,
          message: e.response.data?.formatted_message,
        };
        navigateTo({ pathname: "/causes", state: newState });
        window.location.reload();
      }
      setLocalStorageItem(SHOW_MENU, "true");
    }
  }

  return { handleDonate };
}

export default useDonationFlow;
