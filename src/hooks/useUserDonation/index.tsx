import { PLATFORM } from "utils/constants";
import { logError } from "services/crashReport";
import { setLocalStorageItem } from "lib/localStorage";
import { SHOW_MENU } from "contexts/currentUserContext";
import { useUserV1Donations } from "@ribon.io/shared/hooks";
import { useIntegrationId } from "hooks/useIntegrationId";
import { NonProfit } from "@ribon.io/shared/types";
import extractUrlValue from "lib/extractUrlValue";
import useNavigation from "hooks/useNavigation";
import useVoucher from "hooks/useVoucher";
import { getUTMFromLocationSearch } from "lib/getUTMFromLocationSearch";

type HandleDonateProps = {
  nonProfit: NonProfit;
  onSuccess?: () => void;
  onError?: (error: any) => void;
};
function useUserDonation() {
  const { donate } = useUserV1Donations();
  const integrationId = useIntegrationId();
  const { history, navigateTo } = useNavigation();
  const { destroyVoucher } = useVoucher();

  function getExternalIdFromLocationSearch() {
    return extractUrlValue("external_id", history.location.search);
  }

  async function handleDonate({
    nonProfit,
    onError,
    onSuccess,
  }: HandleDonateProps) {
    const utmParams = getUTMFromLocationSearch(history.location.search);

    if (integrationId) {
      try {
        await donate(
          integrationId,
          nonProfit.id,
          PLATFORM,
          getExternalIdFromLocationSearch(),
          utmParams.utmSource,
          utmParams.utmMedium,
          utmParams.utmCampaign,
        );
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

  return { handleDonate };
}

export default useUserDonation;
