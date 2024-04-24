import { NonProfitImpact } from "@ribon.io/shared";

function nonProfitImpactFactory(
  params: Partial<NonProfitImpact> = {},
): NonProfitImpact {
  const defaultValues: NonProfitImpact = {
    id: 1,
    endDate: "2022-02-15 16:15:23 UTC",
    startDate: "2022-02-15 18:15:23 UTC",
    usdCentsToOneImpactUnit: "100",
    measurementUnit: "days",
    impactDescription: "impact description",
    donorRecipient: "recipient",
    minimumNumberOfTickets: 1,
  };
  return Object.assign(defaultValues, params) as NonProfitImpact;
}

export default nonProfitImpactFactory;
