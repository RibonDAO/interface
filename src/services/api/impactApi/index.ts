import { AxiosResponse } from "axios";
import Impact from "types/entities/Impact";
import { apiGet } from "..";

const impactApi = {
  // FIXME: CHANGE THIS "ANY" RETURN TYPE ON AXIOS_RESPONSE!
  // For example: if you're getting a list of feeds you can have a AxiosResponse<Feed[]>
  getImpact: (id: number | null): Promise<AxiosResponse<Impact[]>> =>
    apiGet(`users/${id}/impacts`),
};

export default impactApi;
