import Utm from "types/entities/Utm";

function utmFactory(params: Partial<Utm> = {}): Utm {
  const defaultValues: Utm = {
    utmCampaign: "campaign",
    utmMedium: "medium",
    utmSource: "source",
  };
  return Object.assign(defaultValues, params) as Utm;
}

export default utmFactory;
