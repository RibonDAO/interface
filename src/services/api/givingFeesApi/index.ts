import { AxiosResponse } from "axios";
import CardFees from "types/apiResponses/CardFees";
import { Currencies } from "@ribon.io/shared/types";
import { apiPost } from "..";

const givingFeesApi = {
  postCardFees: (
    value: number,
    currency: Currencies,
  ): Promise<AxiosResponse<CardFees>> =>
    apiPost("givings/card_fees", {
      value,
      currency,
    }),
};

export default givingFeesApi;
