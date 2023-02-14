import { AxiosResponse } from "axios";
import { PersonPayment } from "types/entities/PersonPayment";
import { apiGet } from "..";

const personPaymentsApi = {
  getCommunityPersonPayments: (
    email?: string,
    walletAddress?: string,
    page?: number,
    per?: number,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(
      `person_payments/cause?${email ? `email=${email}&` : ""}${
        walletAddress ? `wallet_address=${walletAddress}&` : ""
      }${page && per ? `page=${page}&per=${per}` : ""}`,
    ),

  getDirectPersonPayments: (
    email?: string,
    walletAddress?: string,
    page?: number,
    per?: number,
  ): Promise<AxiosResponse<PersonPayment[]>> =>
    apiGet(
      `person_payments/non_profit?${email ? `email=${email}&` : ""}${
        walletAddress ? `wallet_address=${walletAddress}&` : ""
      }${page && per ? `page=${page}&per=${per}` : ""}`,
    ),
};

export default personPaymentsApi;
