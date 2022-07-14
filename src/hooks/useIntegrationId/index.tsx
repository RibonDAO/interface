import { RIBON_COMPANY_ID } from "utils/constants";
import useQueryParams from "../useQueryParams";

export function useIntegrationId() {
  const queryParams = useQueryParams();
  const INTEGRATION_ID = queryParams.get("integration_id") || RIBON_COMPANY_ID;
  if (!INTEGRATION_ID) return null;

  return parseInt(INTEGRATION_ID, 10);
}
