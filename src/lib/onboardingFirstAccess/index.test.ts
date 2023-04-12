import { setLocalStorageItem } from "@ribon.io/shared";
import { isFirstAccess } from ".";

describe("isFirstAccess", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should return the correct value", () => {
    expect(isFirstAccess(true)).toEqual(true);
  });

  it("should return the correct value", () => {
    setLocalStorageItem("HAS_DONATED", "true");
    expect(isFirstAccess(true)).toEqual(false);
  });

  it("should return the correct value", () => {
    setLocalStorageItem("SHOW_MENU", "true");
    setLocalStorageItem("HAS_DONATED", "true");
    expect(isFirstAccess(true)).toEqual(false);
  });
});
