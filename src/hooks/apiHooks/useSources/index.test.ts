import { renderHook } from "@testing-library/react-hooks";
import sourcesApi from "services/api/sourcesApi";
import useSources from ".";

describe("useUsers", () => {
  let hook: ReturnType<typeof useSources>;
  const testUserId = 1;
  const testIntegrationId = 2;

  const data = { testUserId, testIntegrationId };

  beforeEach(() => {
    const { result } = renderHook(() => useSources());
    hook = result.current;
  });

  describe("#createSource", () => {
    beforeEach(() => {
      sourcesApi.postCreateSource = jest.fn(() => ({ data } as any));
    });

    it("calls the usersApi searchUser with correct params", () => {
      hook.createSource(testUserId, testIntegrationId);

      expect(sourcesApi.postCreateSource).toHaveBeenCalledWith(
        testUserId,
        testIntegrationId,
      );
    });

    it("returns the data fetched from the api", async () => {
      const findResultResult = await hook.createSource(
        testUserId,
        testIntegrationId,
      );
      expect(findResultResult).toEqual(data);
    });
  });
});
