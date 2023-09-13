import { getUTMFromLocationSearch, utmParamsToString } from ".";

describe("getUTMFromLocationSearch", () => {
  const locationSearch = "?utm_source=google&utm_medium=cpc&utm_campaign=brand";
  it("should return utm params in a object", () => {
    expect(getUTMFromLocationSearch(locationSearch)).toStrictEqual({
      utmCampaign: "brand",
      utmMedium: "cpc",
      utmSource: "google",
    });
  });
});

describe("utmParamsToString", () => {
  const locationSearch = "?utm_source=google&utm_medium=cpc&utm_campaign=brand";
  it("should return utm params in a string", () => {
    const utmParams = getUTMFromLocationSearch(locationSearch);
    expect(utmParamsToString(utmParams)).toStrictEqual(
      `&utm_source=${utmParams.utmSource}&utm_medium=${utmParams.utmMedium}&utm_campaign=${utmParams.utmCampaign}`,
    );
  });
});
