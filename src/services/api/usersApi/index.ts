import { AxiosResponse } from "axios";
import User from "types/entities/User";
import { CanDonate } from "types/apiResponses/CanDonate";
import { apiPost } from "..";

const usersApi = {
  postCreateUser: (email: string): Promise<AxiosResponse<User>> =>
    apiPost("users", { email }),

  postSearchUser: (email: string): Promise<AxiosResponse<User>> =>
    apiPost("users/search", { email }),

  postCanDonate: (
    integrationId: number | string,
  ): Promise<AxiosResponse<CanDonate>> =>
    apiPost("users/can_donate", { integrationId }),
};

export default usersApi;
