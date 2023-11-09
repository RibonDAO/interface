import { authenticationApiPost } from "@ribon.io/shared/services";
import { AxiosResponse } from "axios";

const authApi = {
  authenticate: (
    token: string,
    provider: string,
  ): Promise<AxiosResponse<any>> =>
    authenticationApiPost("auth/authenticate", { token, provider }),
  postAuthorizeFromAuthToken: (
    authToken: string,
    id: string,
  ): Promise<AxiosResponse<any>> =>
    authenticationApiPost("auth/authorize_from_auth_token", { authToken, id }),
  sendAuthenticationEmail: (
    email: string)
    : Promise<AxiosResponse<any>> =>
    authenticationApiPost("auth/send_authentication_email", { email })
};

export default authApi;
