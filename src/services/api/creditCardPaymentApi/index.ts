import { AxiosResponse } from "axios";
import CreditCardPayment from "types/entities/CreditCardPayment";
import { apiPost } from "@ribon.io/shared/services";

const creditCardPaymentApi = {
  postCreditCardPayment: (
    paymentInformation: CreditCardPayment,
  ): Promise<AxiosResponse<CreditCardPayment>> =>
    apiPost("payments/credit_cards", paymentInformation),
};

export default creditCardPaymentApi;
