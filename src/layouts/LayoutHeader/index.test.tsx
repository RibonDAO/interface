import { clickOn, renderComponent } from "config/testUtils";
import { expectPageToNavigateTo } from "config/testUtils/expects";
import { removeLocalStorageItem, setLocalStorageItem } from "lib/localStorage";
import { HAS_AN_AVAILABLE_VOUCHER } from "lib/localStorage/constants";
import { screen } from "@testing-library/react";
import { useImpactConversion } from "hooks/useImpactConversion";
import LayoutHeader from ".";

const mockIntegration = {
  id: 3,
  name: "Test Integration",
  logo: "logo",
  integrationTask: {
    id: 1,
    description: "Test description",
    link: "Test link",
    linkAddress: "https://www.test.com",
  },
  status: "active",
  ticketAvailabilityInMinutes: 1,
};

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

describe("LayoutHeader", () => {
  describe("when user can donate", () => {
    it("should navigate to earn page", () => {
      renderComponent(<LayoutHeader />, {
        ticketsProviderValue: {
          ticketsCounter: 1,
        },
      });
      clickOn("1");
      expectPageToNavigateTo("/earn");
    });
  });

  describe("when user can't donate", () => {
    it("should navigate to earn page", () => {
      renderComponent(<LayoutHeader />, {
        ticketsProviderValue: {
          ticketsCounter: 0,
        },
      });
      clickOn("0");
      expectPageToNavigateTo("/earn");
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
        nonProfit: {
          name: "Test Non-Profit",
          impactDescription: "description",
        },
        offer: { id: 1 },
        description: "This is a test description",
        variation: "Test Variation",
      });
    });

    describe("when user can donate", () => {
      beforeEach(() => {
        setLocalStorageItem(HAS_AN_AVAILABLE_VOUCHER, "true");
        renderComponent(<LayoutHeader />, {
          integrationProviderValue: {
            integration: mockIntegration,
            currentIntegrationId: "3",
          },
        });

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
        renderComponent(<LayoutHeader />, {
          ticketsProviderValue: { hasTickets: false },
          integrationProviderValue: {
            integration: mockIntegration,
            currentIntegrationId: "3",
          },
        });

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
