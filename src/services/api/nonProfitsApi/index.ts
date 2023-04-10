import { AxiosResponse } from "axios";
import { NonProfit } from "@ribon.io/shared/types";
import { apiGet } from "..";

const nonProfitsApi = {
  getNonProfits: (): Promise<AxiosResponse<NonProfit[]>> =>
    apiGet("non_profits"),
};

export default nonProfitsApi;
