import React from "react";
import { render, screen } from "@testing-library/react";
import { renderHook } from "config/testUtils/renders";
import { waitForPromises } from "config/testUtils";
import { useCausesContext } from ".";

const mockCause = {
  id: 1,
  name: "Animal Cause",
  status: "active",
  pools: [],
};
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useCauses: () => ({
    causes: [mockCause],
    isLoading: false,
    refetch: jest.fn(),
  }),
}));

function CausesContextTestPage() {
  useCausesContext();
  return <div>CausesContext</div>;
}

describe("useCausesContext", () => {
  let current: ReturnType<typeof useCausesContext>;
  it("should render without error", () => {
    render(<CausesContextTestPage />);
    expect(screen.getByText("CausesContext")).toBeInTheDocument();
  });

  describe("causes", () => {
    beforeEach(async () => {
      const { hook } = renderHook(() => useCausesContext());
      await waitForPromises();
      current = hook.result.current;
    });

    it("renders the modal when show is called", async () => {
      const { causes } = current;
      await waitForPromises();
      expect(causes).toEqual([mockCause]);
    });
  });
});
