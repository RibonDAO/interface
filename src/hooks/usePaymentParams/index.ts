import useQueryParams from "hooks/useQueryParams";

export default function usePaymentParams() {
  const queryParams = useQueryParams();

  const target = queryParams.get("target");
  const targetId = queryParams.get("target_id");
  const currency = queryParams.get("currency");
  const offer = queryParams.get("offer");
  const paymentMethodIndex = queryParams.get("paymentMethodIndex");
  const subscription = queryParams.get("subscription");
  const language = queryParams.get("language");
  const from = queryParams.get("from");

  const hasAllParams = Boolean(target && targetId && currency && offer);

  return {
    target,
    targetId,
    currency,
    offer,
    subscription,
    language,
    hasAllParams,
    paymentMethodIndex,
    from,
  };
}
