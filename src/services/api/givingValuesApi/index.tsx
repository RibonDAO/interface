import { AxiosResponse } from "axios";
import GivingValue from "types/entities/GivingValue";
import { apiGet } from "..";

const givingValuesApi = {
  getGivingValues: (
    coin: "usd" | "brl",
  ): Promise<AxiosResponse<GivingValue[]>> =>
    apiGet(`giving_values?currency=${coin}`),
};

export default givingValuesApi;
