import { AxiosResponse } from "axios";
import { apiGet } from "..";

const donationImpactsApi = {
  getDonationImpact: (): Promise<AxiosResponse<any>> => apiGet("users/impact"),
};

export default donationImpactsApi;
