import promoterDonationsApi from "services/apiTheGraph/promoterDonationsApi";

function usePromoterDonations() {
  async function getPromoterDonations(user: string, maxQuantity: number) {
    const { data: promoterDonations } =
      await promoterDonationsApi.fetchPromoterDonations(user, maxQuantity);
    return promoterDonations;
  }
  return { getPromoterDonations };
}

export default usePromoterDonations;
