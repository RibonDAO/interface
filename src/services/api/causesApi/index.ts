import { AxiosResponse } from "axios";
import { Cause } from "@ribon.io/shared/types";
import { apiGet } from "..";

const causesApi = {
  getCauses: (): Promise<AxiosResponse<Cause[]>> => apiGet("causes/"),
  getCause: (id: number): Promise<AxiosResponse<Cause>> =>
    apiGet(`causes/${id}`),
};

export default causesApi;
