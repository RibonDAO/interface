import { AxiosResponse } from "axios";
import { Integration } from "@ribon.io/shared/types";
import { apiGet } from "..";

const integrationsApi = {
  getIntegration: (id: number | string): Promise<AxiosResponse<Integration>> =>
    apiGet(`integrations/${id}`),
};

export default integrationsApi;
