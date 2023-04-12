import { today } from ".";

describe("today", () => {
  it("should return the correct date", () => {
    expect(today()).toEqual(new Date().toLocaleDateString().toString());
  });
});
