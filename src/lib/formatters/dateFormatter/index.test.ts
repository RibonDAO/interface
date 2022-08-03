import { stringToLocaleDateString } from ".";

describe("#stringToLocaleDateString", () => {
  describe("when you have a date string", () => {
    it("formats returning only the locale date string", () => {
      expect(stringToLocaleDateString("2022-08-03 13:03:08 UTC")).toEqual(
        new Date("2022-08-03 13:03:08 UTC").toLocaleDateString(),
      );
    });
  });
});
