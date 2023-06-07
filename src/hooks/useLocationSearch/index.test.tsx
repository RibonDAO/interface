import { renderHook } from "@testing-library/react-hooks";
import { useLocationSearch } from ".";

const mockPush = jest.fn();
jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    search: "search",
    pathname: "pathname",
  }),
  useHistory: () => ({
    push: mockPush,
  }),
}));

describe("useLocationSearch", () => {
  it("should return the correct params", () => {
    const { result } = renderHook(() => useLocationSearch());
    expect(result.current.search).toEqual("search");
  });

  it("updates the location search correctly", () => {
    const { result } = renderHook(() => useLocationSearch());
    result.current.updateLocationSearch("key", "value");

    expect(mockPush).toHaveBeenCalledWith({
      pathname: "pathname",
      search: "search=&key=value",
    });
  });
});
