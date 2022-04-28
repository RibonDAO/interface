import { AxiosResponse } from "axios";
import Impact from "types/entities/Impact";
import DonationsCount from "types/apiResponses/DonationsCount";
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
