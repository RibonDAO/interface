import getUTMFromLocationSearch from ".";

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
