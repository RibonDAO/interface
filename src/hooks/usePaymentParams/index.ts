import useQueryParams from "hooks/useQueryParams";

export default function usePaymentParams() {
  const queryParams = useQueryParams();

  const target = queryParams.get("target");
  const targetId = queryParams.get("target_id");
  const currency = queryParams.get("currency");
  const offer = queryParams.get("offer");

  const hasAllParams = Boolean(target && targetId && currency && offer);

  return {
    target,
    targetId,
    currency,
    offer,
    hasAllParams,
  };
}
