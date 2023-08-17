import { AxiosResponse } from "axios";
// import { Subscription } from "@ribon.io/shared/types";
import Subscription from "types/entities/Subscription";
import { apiGet } from "..";

const subscriptionsApi = {
  getUserSubscriptions: (
    userId: number | string,
  ): Promise<AxiosResponse<Subscription[]>> =>
    apiGet(`subscriptions_for_customer/${userId}`),
};

export default subscriptionsApi;
