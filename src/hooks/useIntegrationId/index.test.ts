import { renderHook } from "@testing-library/react-hooks";
import { useIntegrationId } from ".";

const testUUID = "c7cfe00a-8030-4866-9e84-568b917a097f";

jest.mock("hooks/useQueryParams", () => ({
  __esModule: true,
  default: () => ({
    get: () => testUUID,
  }),
}));

describe("useIntegrationId", () => {
  it("should return the correct params", () => {
    const { result } = renderHook(() => useIntegrationId());

    expect(result.current).toEqual(testUUID);
  });
});
