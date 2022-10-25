import { AxiosResponse } from "axios";
import Cause from "types/entities/Cause";
import { apiGet } from "..";

const causesApi = {
  getCauses: (): Promise<AxiosResponse<Cause[]>> => apiGet("causes/"),
};

export default causesApi;
