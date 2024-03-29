import {
  apiGet,
  apiDelete,
  apiPut,
  apiPost,
  api,
  initializeApi as initializeSharedApi,
  initializeAuthenticationApi,
  emptyRequest,
} from "@ribon.io/shared/services";
import { initializeHooks } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { currentUserFromStorage } from "lib/currentUser";
import { RIBON_API } from "utils/constants";

export const baseURL = RIBON_API;
export function initializeApi() {
  const lang = normalizedLanguage();
  const user = currentUserFromStorage();
  const authHeaders = {
    Language: lang,
    Email: user?.email || "",
    platform: "web",
  };

  initializeSharedApi({ url: baseURL, headers: authHeaders });
  initializeAuthenticationApi({ url: baseURL, headers: authHeaders });

  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost, emptyRequest };
export default api;
