import {
  apiGet,
  apiDelete,
  apiPut,
  apiPost,
  api,
  initializeApi as initializeSharedApi,
  emptyRequest,
} from "@ribon.io/shared/services";
import { initializeHooks } from "@ribon.io/shared/hooks";
import { normalizedLanguage } from "lib/currentLanguage";
import { currentUserFromStorage } from "lib/currentUser";

const RIBON_API = "https://dapp-dev-api.ribon.io/";
export const baseURL = process.env.REACT_APP_RIBON_API || RIBON_API;
export function initializeApi() {
  const lang = normalizedLanguage();
  const user = currentUserFromStorage();
  const authHeaders = { Language: lang, Email: user?.email || "" };

  initializeSharedApi({ url: baseURL, headers: authHeaders });

  initializeHooks({
    initializeApiOptions: { url: baseURL, headers: authHeaders },
  });
}

export { apiGet, apiDelete, apiPut, apiPost, emptyRequest };
export default api;
