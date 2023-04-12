import { setLocalStorageItem } from "@ribon.io/shared";
import { CURRENT_USER_KEY } from "contexts/currentUserContext";
import { currentUserFromStorage } from ".";

describe("currentUserFromStorage", () => {
  it("should return the correct user", () => {
    expect(currentUserFromStorage()).toEqual(null);
  });

  it("should return the correct user", () => {
    setLocalStorageItem(CURRENT_USER_KEY, JSON.stringify({ name: "John" }));
    expect(currentUserFromStorage()).toEqual({ name: "John" });
  });
});
