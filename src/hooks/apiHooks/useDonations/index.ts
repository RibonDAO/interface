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
  });

  async function donate(
    integrationId: number,
    nonProfitId: number,
    email: string,
  ) {
    await donationsApi.postDonation(integrationId, nonProfitId, email);
  }

  return {
    donate,
    donationsCount: donationsCountResponse?.donationsCount,
  };
}

export default useDonations;
