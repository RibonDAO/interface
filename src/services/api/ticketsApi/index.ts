import { Donation } from "@ribon.io/shared/types";
import { AxiosResponse } from "axios";
import { apiPost } from "..";

const ticketsApi = {
  postTicketsDonation: (
    nonProfitId: number,
    quantity: number,
    platform?: "app" | "web",
    utmSource?: string,
    utmMedium?: string,
    utmCampaign?: string,
  ): Promise<AxiosResponse<Donation>> =>
    apiPost("tickets/donate", {
      nonProfitId,
      quantity,
      platform,
      utmSource,
      utmMedium,
      utmCampaign,
    }),
};
export default ticketsApi;
