import { AxiosResponse } from "axios";
import { apiPost } from "..";

const donationsApi = {
  // FIXME: CHANGE THIS "ANY" RETURN TYPE ON AXIOS_RESPONSE!
  // For example: if you're getting a list of feeds you can have a AxiosResponse<Feed[]>
  postDonation: (
    integrationId: number,
    nonProfitId: number,
  ): Promise<AxiosResponse<any>> =>
    apiPost("donations", { integrationId, nonProfitId }),
};

export default donationsApi;
