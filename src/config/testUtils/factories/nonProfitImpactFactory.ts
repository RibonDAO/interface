import NonProfitImpact from "types/entities/NonProfitImpact";

function nonProfitImpactFactory(
  params: Partial<NonProfitImpact> = {},
): NonProfitImpact {
  const defaultValues: NonProfitImpact = {
    id: 1,
    startDate: "2022-02-15 16:15:23 UTC",
    endDate: "2022-02-15 18:15:23 UTC",
    impactDescription: "kg of food, kgs of food",
    donorRecipient: "person,people",
    usdCentsToOneImpactUnit: "1",
    measurementUnit: "quantity_without_decimals",
  };
  return Object.assign(defaultValues, params) as NonProfitImpact;
}

export default nonProfitImpactFactory;
