import extractUrlValue from "../extractUrlValue";
import Utm from "types/entities/Utm";

export default function extractUtmFromUrl(url: string): Utm | null {
  return {
    utmSource: extractUrlValue("utm_source", url),
    utmMedium: extractUrlValue("utm_medium", url),
    utmCampaign: extractUrlValue("utm_campaign", url),
  };
}
