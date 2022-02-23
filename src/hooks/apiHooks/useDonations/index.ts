import donationsApi from "services/api/donationsApi";

function useDonations() {
  async function donate(integrationId: number, nonProfitId: number) {
    await donationsApi.postDonation(integrationId, nonProfitId);
  }

  return {
    donate,
  };
}

export default useDonations;
