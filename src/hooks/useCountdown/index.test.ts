import { renderHook } from "@testing-library/react-hooks";
import { useCountdown } from ".";

describe("useCountdown", () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2020, 9, 1, 12));
  });

  it("should return the initial countdown value", () => {
    const targetDate = new Date("2023-05-01T00:00:00").toISOString();
    const { result } = renderHook(() => useCountdown(targetDate));
    expect(result.current).toEqual([12, 0, 0]);
  });
});
