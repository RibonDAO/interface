import extractUrlValue from "lib/extractUrlValue";

function getUTMFromLocationSearch(search: string) {
  const source = extractUrlValue("utm_source", search);
  const medium = extractUrlValue("utm_medium", search);
  const campaign = extractUrlValue("utm_campaign", search);

  const utmSource = source || "organic";

  const utmMedium = medium || "default";

  const utmCampaign = campaign || "default";

  return { utmSource, utmMedium, utmCampaign };
}

export default getUTMFromLocationSearch;
