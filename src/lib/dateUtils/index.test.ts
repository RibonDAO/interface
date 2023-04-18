import { nextDay, nextMonth, beginningOfToday, beginningOfThisMonth } from ".";

describe("dateUtils", () => {
  describe("nextDay", () => {
    it("should return the correct date", () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      tomorrow.setHours(0, 0, 0, 0);

      expect(nextDay()).toEqual(tomorrow);
    });
  });

  describe("nextMonth", () => {
    it("should return the correct date", () => {
      const nextMonthDate = new Date();
      nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
      nextMonthDate.setHours(0, 0, 0, 0);

      expect(nextMonth()).toEqual(nextMonthDate);
    });
  });

  describe("beginningOfToday", () => {
    it("should return the correct date", () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      expect(beginningOfToday()).toEqual(today);
    });
  });

  describe("beginningOfThisMonth", () => {
    it("should return the correct date", () => {
      const today = new Date();
      today.setDate(1);
      today.setHours(0, 0, 0, 0);

      expect(beginningOfThisMonth()).toEqual(today);
    });
  });
});
