import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import React from "react";
import { mockRequest } from "config/testUtils/test-helper";
import { screen } from "@testing-library/react";
import { mockLogEventFunction } from "setupTests";
import { useImpactConversion } from "hooks/useImpactConversion";
import LayoutHeader from ".";

const mockIntegration = {
  id: "1",
  name: "Test Integration",
  logo: "logo",
  integrationTask: {
    linkAddress: "https://www.test.com",
  },
};
jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useIntegration: () => ({
    integration: mockIntegration,
    refetch: jest.fn(),
  }),
}));
jest.mock("hooks/useIntegrationId", () => ({
  __esModule: true,
  ...jest.requireActual("hooks/useIntegrationId"),
  useIntegrationId: () => "9",
}));

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

  describe("when side logo is clicked", () => {
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
    });

    describe("when user can donate", () => {
      beforeEach(() => {
        setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "true");
        renderComponent(<LayoutHeader />);

        const sideLogo = screen.getByAltText("side-logo");
        clickOn(sideLogo);
      });

      it("goes to the return to integration page", () => {
        expectPageToNavigateTo("return-to-integration");
      });
    });

    describe("when user can't donate", () => {
      beforeEach(() => {
        global.open = jest.fn();
        removeLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER);
        renderComponent(<LayoutHeader />);

        const sideLogo = screen.getByAltText("side-logo");
        clickOn(sideLogo);
      });

      it("goes to the integration page directly", () => {
        expect(global.open).toHaveBeenCalledWith(
          mockIntegration.integrationTask.linkAddress,
        );
      });
    });
  });
});
