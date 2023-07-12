import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import React from "react";
import { mockRequest } from "config/testUtils/test-helper";
import { mockLogEventFunction } from "setupTests";
import { useImpactConversion } from "hooks/useImpactConversion";
import LayoutHeader from ".";

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

describe("LayoutHeader", () => {
  describe("when user can donate", () => {
    mockRequest("/api/v1/users/can_donate", {
      payload: { canDonate: true },
      method: "POST",
    });

    beforeEach(async () => {
      const mockUseImpactConversion = useImpactConversion as jest.Mock;
      mockUseImpactConversion.mockReturnValue({});
      await waitForPromises();
      setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "123");
    });

    it("should navigate to give ticket page when click in ticket button", () => {
      renderComponent(<LayoutHeader />);
      clickOn("1");
      expectPageToNavigateTo("/tickets");
    });
  });

  describe("when user can't donate", () => {
    mockRequest("/api/v1/users/can_donate", {
      payload: { canDonate: false },
      method: "POST",
    });

    beforeEach(() => {
      const mockUseImpactConversion = useImpactConversion as jest.Mock;
      mockUseImpactConversion.mockReturnValue({
        contribution: {
          image: "test-image-url",
          impact: "This is a test impact",
          value: 100,
        },
        nonProfit: { name: "Test Non-Profit" },
        offer: { id: 1 },
        description: "This is a test description",
        variation: "Test Variation",
      });
      removeLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);
      renderComponent(<LayoutHeader />);
    });

    it("should open blocked donation contribution modal", () => {
      clickOn("0");
      expect(mockLogEventFunction).toHaveBeenCalledWith(
        "contributeNgoBtn_view",
        {
          from: "zeroTickets_modal",
          platform: "web",
        },
      );
    });
  });
});
