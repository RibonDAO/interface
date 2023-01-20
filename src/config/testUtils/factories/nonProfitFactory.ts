import NonProfit from "types/entities/NonProfit";
import Cause from "types/entities/Cause";
import NonProfitImpact from "types/entities/NonProfitImpact";

function nonProfitFactory(params: Partial<NonProfit> = {}): NonProfit {
  const defaultValues: NonProfit = {
    id: 1,
    name: "Non-profit",
    logo: "",
    createdAt: "2022-02-15 16:15:23 UTC",
    updatedAt: "2022-02-15 18:15:23 UTC",
    walletAddress: "0x0000000000000000000000000000000000000000",
    impactDescription: "Impact description",
    impactByTicket: 1,
    backgroundImage: "",
    coverImage: "",
    mainImage: "",
    nonProfitImpacts: [
      {
        id: 1,
        startDate: "2022-02-15 16:15:23 UTC",
        endDate: "2022-02-15 18:15:23 UTC",
        impactDescription: "kg of food, kgs of food",
        donorRecipient: "person,people",
        usdCentsToOneImpactUnit: "1",
        measurementUnit: "quantity_without_decimals",
      } as NonProfitImpact,
    ],
    cause: {} as Cause,
  };
  return Object.assign(defaultValues, params) as NonProfit;
}

export default nonProfitFactory;
