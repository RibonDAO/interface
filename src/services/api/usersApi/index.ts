import { AxiosResponse } from "axios";
import { User, CanDonate } from "@ribon.io/shared/types";
import FirstAccessToIntegration from "types/apiResponses/FirstAccessToIntegration";
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

  getFirstAccessToIntegration: (
    integrationId: number | string | null,
  ): Promise<AxiosResponse<FirstAccessToIntegration>> =>
    apiGet(
      `users/first_access_to_integration/?integration_id=${integrationId}`,
    ),

  postCanDonate: (
    integrationId: number | string,
  ): Promise<AxiosResponse<CanDonate>> =>
    apiPost("users/can_donate", { integrationId }),
};

export default usersApi;
