import { rgba } from ".";

describe("rgba", () => {
  it("should return rgba value", () => {
    expect(rgba("#000000", 0.5)).toBe("rgba(0, 0, 0, 0.5)");
    expect(rgba("#000000", 0.8)).toBe("rgba(0, 0, 0, 0.8)");
    expect(rgba("#000000", 0.9)).toBe("rgba(0, 0, 0, 0.9)");
    expect(rgba("#FFFFFF", 1)).toBe("rgba(255, 255, 255, 1)");
  });
});
