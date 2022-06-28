import { AxiosResponse } from "axios";
import Offer from "types/entities/Offer";
import { Currencies } from "types/enums/Currencies";
import { apiGet } from "..";

const offersApi = {
  getOffers: (
    currency: Currencies,
    subscription: boolean,
  ): Promise<AxiosResponse<Offer[]>> =>
    apiGet(
      `givings/offers?currency=${currency.toLowerCase()}&subscription=${subscription}`,
    ),
};

export default offersApi;
