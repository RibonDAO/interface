import { AxiosResponse } from "axios";
// import { Subscription } from "@ribon.io/shared/types";
import Subscription from "types/entities/Subscription";
import { apiGet, apiPost } from "..";

const subscriptionsApi = {
  getUserSubscriptions: (
    userId: number | string,
  ): Promise<AxiosResponse<Subscription[]>> =>
    apiGet(`payments/subscriptions_for_customer/${userId}`),

  postSendCancelSubscriptionEmail: (
    subscriptionId: number | string,
  ): Promise<AxiosResponse<Subscription[]>> =>
    apiPost("payments/send_cancel_subscription_email", { subscriptionId }),
};

export default subscriptionsApi;
