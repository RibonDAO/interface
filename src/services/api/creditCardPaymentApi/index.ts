import { AxiosResponse } from "axios";
import { CreditCardPayment } from "@ribon.io/shared/types";
import { apiPost } from "..";

const creditCardPaymentApi = {
  postCreditCardPayment: (
    paymentInformation: CreditCardPayment,
  ): Promise<AxiosResponse<CreditCardPayment>> =>
    apiPost("payments/credit_cards", paymentInformation),
};

export default creditCardPaymentApi;
