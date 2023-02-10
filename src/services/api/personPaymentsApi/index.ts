import { AxiosResponse } from "axios";
import { PersonPayment } from "types/entities/PersonPayment";
import { apiGet } from "..";

const personPaymentsApi = {
  getCommunityPersonPayments: (
    personIdentifier: string,
    page?: number,
    per?: number,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(
      `person_payments/${personIdentifier}/causes${
        page && per ? `?page=${page}&per=${per}` : ""
      }`,
    ),

  getDirectPersonPayments: (
    personIdentifier: string,
    page?: number,
    per?: number,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(
      `person_payments/${personIdentifier}/non_profits${
        page && per ? `?page=${page}&per=${per}` : ""
      }`,
    ),
};

export default personPaymentsApi;
