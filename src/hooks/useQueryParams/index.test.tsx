import { renderHook } from "@testing-library/react-hooks";
import useQueryParams from ".";

jest.mock("react-router-dom", () => ({
  useLocation: () => ({
    search: "teste",
  }),
}));

describe("useQueryParams", () => {
  it("should return an empty object if there are no query params", () => {
    const { result } = renderHook(() => useQueryParams());
    expect(result.current).toEqual(new URLSearchParams("teste"));
  });
});
