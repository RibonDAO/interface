import { AxiosResponse } from "axios";
import Integration from "types/entities/Integration";
import { apiGet } from "..";

const integrationsApi = {
  getIntegration: (id: number | string): Promise<AxiosResponse<Integration>> =>
    apiGet(`integrations/${id}`),
};

export default integrationsApi;
