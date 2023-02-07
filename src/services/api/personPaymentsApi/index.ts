import { AxiosResponse } from "axios";
import { PersonPayment } from "types/entities/PersonPayment";
import { apiGet } from "..";

const personPaymentsApi = {
  getCommunityPersonPayments: (
    personIdentifier: string,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(`person_payments/causes/${personIdentifier}`),
};

export default personPaymentsApi;
