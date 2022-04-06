import useQueryParams from "../useQueryParams";

export function useIntegrationId() {
  const queryParams = useQueryParams();
  const RIBON_ID = process.env.REACT_APP_RIBON_COMPANY_ID;
  const INTEGRATION_ID = queryParams.get("integration_id") || RIBON_ID;
  if (!INTEGRATION_ID) return null;

  return parseInt(INTEGRATION_ID, 10);
}
