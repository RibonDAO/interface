import { AxiosResponse } from "axios";
import { PersonPayment } from "types/entities/PersonPayment";
import { apiGet } from "..";

const personPaymentsApi = {
  getCommunityPersonPayments: (
    personIdentifier: string,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(`person_payments/${personIdentifier}/causes`),

  getDirectPersonPayments: (
    personIdentifier: string,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(`person_payments/${personIdentifier}/non_profits`),
};

export default personPaymentsApi;
