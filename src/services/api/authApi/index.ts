import { authenticationApiPost } from "@ribon.io/shared/services";
import { AxiosResponse } from "axios";

const authApi = {
  authenticate: (
    idToken: string,
    provider: string,
  ): Promise<AxiosResponse<any>> =>
    authenticationApiPost("auth/authenticate", { idToken, provider }),
};

export default authApi;
