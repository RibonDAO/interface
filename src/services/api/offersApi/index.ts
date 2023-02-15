import { AxiosResponse } from "axios";
import Offer from "types/entities/Offer";
import { Currencies } from "@ribon.io/shared/types";
import { apiGet } from "..";

const offersApi = {
  getOffers: (
    currency: Currencies,
    subscription: boolean,
  ): Promise<AxiosResponse<Offer[]>> =>
    apiGet(
      `givings/offers?currency=${currency.toLowerCase()}&subscription=${subscription}`,
    ),
  getOffer: (id: number): Promise<AxiosResponse<Offer>> =>
    apiGet(`givings/offers/${id}`),
};

export default offersApi;
