import { AxiosResponse } from "axios";
import { User, CanDonate } from "@ribon.io/shared/types";
import { apiPost, apiGet } from "..";

const usersApi = {
  postCreateUser: (
    email: string,
    language: string,
  ): Promise<AxiosResponse<User>> => apiPost("users", { email, language }),

  postSearchUser: (email: string): Promise<AxiosResponse<User>> =>
    apiPost("users/search", { email }),

  getUserStatistics: (id: number): Promise<AxiosResponse<User>> =>
    apiGet(`users/${id}/statistics`),

  postCanDonate: (
    integrationId: number | string,
  ): Promise<AxiosResponse<CanDonate>> =>
    apiPost("users/can_donate", { integrationId }),
};

export default usersApi;
