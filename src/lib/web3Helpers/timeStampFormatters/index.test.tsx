import { formatDate } from "./index";

describe("#formatFromTimestamp", () => {
  it("formats a timestamp to date", () => {
    const date = new Date("4/27/2022");

    expect(formatDate(1651061500)).toEqual(date.toLocaleDateString());
  });
});
