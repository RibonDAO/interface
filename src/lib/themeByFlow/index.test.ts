import getThemeByFlow from ".";

const causeObject = {
  shade10: "#FFCAA5",
  shade20: "#FFA86D",
  shade30: "#FA7203",
  shade40: "#A83B00",
};

const nonProfitObject = {
  shade10: "#FFE7FB",
  shade20: "#FBB7CF",
  shade30: "#FF6B6F",
  shade40: "#9A233B",
};

describe("getThemeByFlow", () => {
  it("should return the cause theme", () => {
    expect(getThemeByFlow("cause")).toEqual(causeObject);
  });

  it("should return the non profit theme", () => {
    expect(getThemeByFlow("nonProfit")).toEqual(nonProfitObject);
  });

  it("should return the default theme", () => {
    expect(getThemeByFlow("")).toEqual(causeObject);
  });
});
