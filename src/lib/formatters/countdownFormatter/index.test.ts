import { formatCountdown } from ".";

describe("#formatCountdown", () => {
  describe("when the countdown is made by only 2 digit numbers", () => {
    it("formats countdown", () => {
      expect(formatCountdown([12, 34, 56])).toEqual("12:34:56");
    });
  });

  describe("when the countdown is made by 0 digits", () => {
    it("formats countdown", () => {
      expect(formatCountdown([12, 0, 0])).toEqual("12:00:00");
    });
  });
});
