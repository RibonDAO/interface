import { renderComponent, waitForPromises } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { renderHook } from "config/testUtils/renders";
import { useNonProfitsContext } from ".";

const mockNonProfit = {
  id: 1,
  name: "Animal Cause",
  status: "active",
  pools: [],
};

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useFreeDonationNonProfits: () => ({
    nonProfits: [mockNonProfit],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

function NonProfitsContextTestPage() {
  useNonProfitsContext();
  return <div>NonProfitsContext</div>;
}

describe("useNonProfitsContext", () => {
  let current: ReturnType<typeof useNonProfitsContext>;
  it("renders without error", () => {
    renderComponent(<NonProfitsContextTestPage />);
    expectTextToBeInTheDocument("NonProfitsContext");
  });

  describe("nonProfits", () => {
    beforeEach(async () => {
      const { hook } = renderHook(() => useNonProfitsContext());
      await waitForPromises();
      current = hook.result.current;
    });

    it("renders the modal when show is called", async () => {
      const { nonProfits } = current;
      await waitForPromises();
      expect(nonProfits).toEqual(nonProfits);
    });
  });
});
