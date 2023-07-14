import { AxiosResponse } from "axios";
import { CardFees, Currencies } from "@ribon.io/shared/types";
import { apiPost } from "..";

const givingFeesApi = {
  postCardFees: (
    value: number,
    currency: Currencies,
    gateway?: string,
  ): Promise<AxiosResponse<CardFees>> =>
    apiPost("givings/card_fees", {
      value,
      currency,
      gateway,
    }),
};

export default givingFeesApi;
