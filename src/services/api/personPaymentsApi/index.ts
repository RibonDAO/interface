import { AxiosResponse } from "axios";
import PersonPayment from "types/entities/NonProfit";
import { apiGet } from "..";

const personPaymentsApi = {
  getPersonPayments: (
    personIdentifier: string,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(`person_payments/${personIdentifier}`),
};

export default personPaymentsApi;
