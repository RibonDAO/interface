import { Languages } from "@ribon.io/shared";
import { add30DaysAndFormatDate, stringToLocaleDateString } from ".";

describe("#stringToLocaleDateString", () => {
  describe("when you have a date string", () => {
    it("formats returning only the locale date string", () => {
      expect(stringToLocaleDateString("2022-08-03 13:03:08 UTC")).toEqual(
        new Date("2022-08-03 13:03:08 UTC").toLocaleDateString(),
      );
    });
  });
});

describe("#add30DaysAndFormatDate", () => {
  describe("when you have a date string", () => {
    it("formats returning dd/mm/yyyy and adding 30 days", () => {
      expect(
        add30DaysAndFormatDate("2023-08-28 11:55:07 -0300", Languages.PT),
      ).toEqual("27/09/2023");
    });
  });
});
