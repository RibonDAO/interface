export default interface NonProfitImpact {
  id: number;
  startDate: string;
  endDate: string;
  impactDescription: string;
  donorRecipient: string;
  usdCentsToOneImpactUnit: string;
  measurementUnit: string;
}
