import { formatDate } from "./index";

describe("#formatFromTimestamp", () => {
  it("formats a timestamp to date", () => {
    expect(formatDate(1651061500)).toEqual("4/27/2022");
  });
});
