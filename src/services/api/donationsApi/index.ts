import { AxiosResponse } from "axios";
import { Donation } from "@ribon.io/shared/types";
import { apiPost } from "..";

const donationsApi = {
  postDonation: (
    integrationId: number,
    nonProfitId: number,
    email: string,
  ): Promise<AxiosResponse<Donation>> =>
    apiPost("donations", { integrationId, nonProfitId, email }),

  postVoucherDonation: (
    integrationId: number,
    nonProfitId: number,
    email: string,
    externalId: string,
  ): Promise<AxiosResponse<Donation>> =>
    apiPost("vouchers/donations", {
      integrationId,
      nonProfitId,
      email,
      externalId,
    }),
};

export default donationsApi;
