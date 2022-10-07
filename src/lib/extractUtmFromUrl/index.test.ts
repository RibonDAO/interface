import extractUtmFromUrl from ".";

describe("extractUtmFromUrl", () => {
  it("expects to return the utm object", () => {
    const url =
      "ribon.io?utm_source=source&utm_medium=medium&utm_campaign=campaign&utm_term=term&utm_content=content";
    const utmObject = {
      utmSource: "source",
      utmMedium: "medium",
      utmCampaign: "campaign",
    };
    expect(extractUtmFromUrl(url)).toEqual(utmObject);
  });
});
