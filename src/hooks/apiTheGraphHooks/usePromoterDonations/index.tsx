import promoterDonationsApi from "services/apiTheGraph/promoterDonationsApi";

function usePromoterDonations() {
  async function getPromoterDonations(promoter: string, maxQuantity: number) {
    const { data: promoterDonations } =
      await promoterDonationsApi.fetchPromoterDonations(promoter, maxQuantity);
    return promoterDonations;
  }

  async function getAllPromotersDonations(maxQuantity: number) {
    const { data: promoterDonations } =
      await promoterDonationsApi.fetchAllPromotersDonations(maxQuantity);
    return promoterDonations;
  }
  return { getPromoterDonations, getAllPromotersDonations };
}

export default usePromoterDonations;
