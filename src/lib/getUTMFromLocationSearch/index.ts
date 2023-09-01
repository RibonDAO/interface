import extractUrlValue from "lib/extractUrlValue";

function formatUTM(utm: string | undefined) {
  return utm === "undefined" || utm === null || utm === "" || utm === undefined
    ? "organic"
    : utm;
}

function getUTMFromLocationSearch(search: string) {
  const source = extractUrlValue("utm_source", search);
  const medium = extractUrlValue("utm_medium", search);
  const campaign = extractUrlValue("utm_campaign", search);

  const utmSource = formatUTM(source);

  const utmMedium = formatUTM(medium);

  const utmCampaign = formatUTM(campaign);

  return { utmSource, utmMedium, utmCampaign };
}

export default getUTMFromLocationSearch;
