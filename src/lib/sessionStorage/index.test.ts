import {
  getSessionStorageItem,
  setSessionStorageItem,
  removeSessionStorageItem,
} from ".";

describe("SessionStorage", () => {
  it("should set an item", () => {
    setSessionStorageItem("key", "value");
    expect(getSessionStorageItem("key")).toEqual("value");
  });

  it("should remove an item", () => {
    setSessionStorageItem("key", "value");
    removeSessionStorageItem("key");
    expect(getSessionStorageItem("key")).toEqual(null);
  });
});
