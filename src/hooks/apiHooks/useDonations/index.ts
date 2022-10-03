import donationsApi from "services/api/donationsApi";
import impactApi from "services/api/impactApi";
import { useCurrentUser } from "contexts/currentUserContext";
import { useApi } from "hooks/useApi";
import DonationsCount from "types/apiResponses/DonationsCount";

function useDonations() {
  const { currentUser } = useCurrentUser();
  const { data: donationsCountResponse } = useApi<DonationsCount>({
    key: "donationsCount",
    fetchMethod: () => {
      const id = currentUser ? currentUser.id : null;
      return impactApi.getDonationsCount(id);
    },
    options: {
      enabled: !!currentUser?.id,
    },
  });

  async function donate(
    integrationId: number,
    nonProfitId: number,
    email: string,
    externalId?: string,
  ) {
    if (externalId) {
      await donationsApi.postVoucherDonation(
        integrationId,
        nonProfitId,
        email,
        externalId,
      );

      return;
    }

    await donationsApi.postDonation(integrationId, nonProfitId, email);
  }

  return {
    donate,
    donationsCount: donationsCountResponse?.donationsCount,
  };
}

export default useDonations;
