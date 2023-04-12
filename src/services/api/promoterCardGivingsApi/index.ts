import { AxiosResponse } from "axios";
import { PromoterCardGiving, Currencies } from "@ribon.io/shared/types";
import { apiGet } from "..";

const promoterCardGivingsApi = {
  getPromoterCardGivings: (
    email: string | undefined,
    currency: Currencies,
  ): Promise<AxiosResponse<PromoterCardGiving[]>> =>
    apiGet(`givings/user_givings?email=${email}&currency=${currency}`),
};

export default promoterCardGivingsApi;
