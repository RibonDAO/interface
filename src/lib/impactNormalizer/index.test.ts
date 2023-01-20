import nonProfitFactory from "config/testUtils/factories/nonProfitFactory";
import { impactNormalizer } from ".";

const t = (key: string) => {
  const mockTranslationTable: any = {
    year: "year",
    years: "years",
    month: "month",
    months: "months",
    day: "day",
    days: "days",
    for: "for",
    and: "and",
  };

  return mockTranslationTable[key];
};

describe("#new Normalizer", () => {
  describe("when measurement unit is quantity without decimals", () => {
    const nonProfit = nonProfitFactory({
      nonProfitImpacts: [
        {
          id: 1,
          startDate: "2022-02-15 16:15:23 UTC",
          endDate: "2022-02-15 18:15:23 UTC",
          donorRecipient: "person, people",
          impactDescription: "kg of food, kgs of food",
          measurementUnit: "quantity_without_decimals",
          usdCentsToOneImpactUnit: "200",
        },
      ],
    });

    describe("when the impact is an integer higher than 200", () => {
      it("formats by integer", () => {
        expect(impactNormalizer(nonProfit, 1000, t)).toEqual(
          "200 kgs of food for 5 people",
        );
      });
    });

    describe("when the impact is an integer lower than 200", () => {
      it("formats by integer", () => {
        expect(impactNormalizer(nonProfit, 100, t)).toEqual(
          "100 kgs of food for 1 person",
        );
      });
    });

    describe("when the impact is an integer equal 1", () => {
      it("formats by integer", () => {
        expect(impactNormalizer(nonProfit, 1, t)).toEqual(
          "1 kg of food for 1 person",
        );
      });
    });

    describe("when the impact is an integer not divisible by 200", () => {
      it("formats by integer", () => {
        expect(impactNormalizer(nonProfit, 281, t)).toEqual(
          "141 kgs of food for 2 people",
        );
      });
    });
  });

  describe("when measurement unit is years, months and days", () => {
    const nonProfit = nonProfitFactory({
      nonProfitImpacts: [
        {
          id: 1,
          startDate: "2022-02-15 16:15:23 UTC",
          endDate: "2022-02-15 18:15:23 UTC",
          donorRecipient: "person, people",
          impactDescription: "of health insurance",
          measurementUnit: "days_months_and_years",
          usdCentsToOneImpactUnit: "200",
        },
      ],
    });

    describe("when the period is exactly 1 year in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 365, t)).toEqual(
          "1 year of health insurance for 1 person",
        );
      });
    });

    describe("when the period exceeds 2 years in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 732, t)).toEqual(
          "1 year and 1 day of health insurance for 2 people",
        );
      });
    });

    describe("when the period is less than 1 year in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 200, t)).toEqual(
          "6 months and 20 days of health insurance for 1 person",
        );
      });
    });

    describe("when the period exceeds 1 year and less than 2 in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 400, t)).toEqual(
          "1 year, 1 month and 5 days of health insurance for 1 person",
        );
      });
    });

    describe("when the period is exactly 1 day", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 1, t)).toEqual(
          "1 day of health insurance for 1 person",
        );
      });
    });

    describe("when the period is exactly 10 years in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 3650, t)).toEqual(
          "2 years of health insurance for 5 people",
        );
      });
    });

    describe("when the period exceeds 10 years in days", () => {
      it("formats by period", () => {
        expect(impactNormalizer(nonProfit, 3700, t)).toEqual(
          "1 year, 8 months and 12 days of health insurance for 6 people",
        );
      });
    });
  });
});
