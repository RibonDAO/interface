import { AxiosResponse } from "axios";
import { PixPayment } from "@ribon.io/shared/types";
import { apiPost } from "..";

const pixPaymentApi = {
  postPixPayment: (
    paymentInformation: PixPayment,
  ): Promise<AxiosResponse<any>> => apiPost("payments/pix", paymentInformation),
};

export default pixPaymentApi;
