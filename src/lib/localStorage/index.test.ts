import {
  getLocalStorageItem,
  setLocalStorageItem,
  removeLocalStorageItem,
} from ".";

describe("localStorage", () => {
  it("should set an item", () => {
    setLocalStorageItem("key", "value");
    expect(getLocalStorageItem("key")).toEqual("value");
  });

  it("should remove an item", () => {
    setLocalStorageItem("key", "value");
    removeLocalStorageItem("key");
    expect(getLocalStorageItem("key")).toEqual(null);
  });
});
