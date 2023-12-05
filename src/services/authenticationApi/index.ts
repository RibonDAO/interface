import {
  authenticationApiGet as apiGet,
  authenticationApiDelete as apiDelete,
  authenticationApiPut as apiPut,
  authenticationApiPost as apiPost,
  authenticationApi as api,
  initializeAuthenticationApi as initializeSharedApi,
  emptyRequest,
} from "@ribon.io/shared/services";
import { initializeHooks } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { RIBON_API, ACCESS_TOKEN_KEY } from "utils/constants";
import { getCookiesItem } from "@ribon.io/shared/lib";

export const baseURL = RIBON_API;
export function initializeApi() {
  const lang = normalizedLanguage();
  const authHeaders = {
    Language: lang,
    Authorization: `Bearer ${getCookiesItem(ACCESS_TOKEN_KEY)}`,
  };

  initializeSharedApi({ url: baseURL, headers: authHeaders });

  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost, emptyRequest };
export default api;
