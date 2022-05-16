import { AxiosResponse } from "axios";
import GivingValue from "types/entities/GivingValue";
import { Currencies } from "types/enums/Currencies";
import { apiGet } from "..";

const givingValuesApi = {
  getGivingValues: (coin: Currencies): Promise<AxiosResponse<GivingValue[]>> =>
    apiGet(`giving_values?currency=${coin.toLowerCase()}`),
};

export default givingValuesApi;
