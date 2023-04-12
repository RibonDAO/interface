import { renderHook } from "@testing-library/react-hooks";
import { useLocationSearch } from ".";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    search: "search",
    pathname: "pathname",
  }),
  useHistory: () => ({
    push: jest.fn(),
  }),
}));

describe("useLocationSearch", () => {
  it("should return the correct params", () => {
    const { result } = renderHook(() => useLocationSearch());
    expect(result.current.search).toEqual("search");
  });
});
