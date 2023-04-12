import { AxiosResponse } from "axios";
import { DonationsCount, Impact } from "@ribon.io/shared/types";
import { apiGet } from "..";

const impactApi = {
  getImpact: (id: number | null): Promise<AxiosResponse<Impact[]>> =>
    apiGet(`users/${id}/impacts`),

  getDonationsCount: (
    id: number | null,
  ): Promise<AxiosResponse<DonationsCount>> =>
    apiGet(`users/${id}/donations_count`),
};

export default impactApi;
