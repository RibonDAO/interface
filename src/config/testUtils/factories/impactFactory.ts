import Impact from "types/entities/Impact";
import NonProfit from "types/entities/NonProfit";

function impactFactory(params: Partial<Impact> = {}): Impact {
  const defaultValues: Impact = {
    id: 1,
    impact: "1",
    walletAddress: "0x0000000000000000000000000000000000000000",
    totalDonated: 100,
    nonProfit: { impactDescription: "days of water" } as NonProfit,
  };
  return Object.assign(defaultValues, params) as Impact;
}

export default impactFactory;
