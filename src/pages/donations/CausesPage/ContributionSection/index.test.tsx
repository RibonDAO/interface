import React from "react";
import { useImpactConversion } from "hooks/useImpactConversion";
import { renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import ContributionSection from ".";

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

describe("ContributionSection", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("when has contribution", () => {
    describe("when it's not control variation", () => {
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

        renderComponent(<ContributionSection />);
      });
      it("renders contribution card ", () => {
        expectTextToBeInTheDocument(
          "Amazing! Thank you for helping Test Non-Profit",
        );
        expectTextToBeInTheDocument("This is a test impact");
        expectTextToBeInTheDocument("Donate R$ 100");
      });
    });

    describe("when it's control variation", () => {
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
          variation: "Control",
        });

        renderComponent(<ContributionSection />);
      });

      it("renders contribution card when variation is 'Control'", () => {
        expectTextNotToBeInTheDocument(
          "Amazing! Thank you for helping Test Non-Profit",
        );
        expectTextNotToBeInTheDocument("This is a test impact");
        expectTextNotToBeInTheDocument("Donate R$ 100");
      });
    });
  });

  describe("when has no contribution", () => {
    describe("when contribution is null", () => {
      beforeEach(() => {
        const mockUseImpactConversion = useImpactConversion as jest.Mock;
        mockUseImpactConversion.mockReturnValue({
          contribution: null,
          nonProfit: { name: "Test Non-Profit" },
          offer: { id: 1 },
          description: "This is a test description",
          variation: "Control",
        });

        renderComponent(<ContributionSection />);
      });
      it("do not renders contribution card", () => {
        expectTextNotToBeInTheDocument(
          "Amazing! Thank you for helping Test Test Non-Profit",
        );
        expectTextNotToBeInTheDocument("This is a test impact");
        expectTextNotToBeInTheDocument("Donate R$ 100");
      });
    });
  });

  describe("applies style acordding to the screen", () => {
    describe("mobile", () => {
      beforeEach(() => {
        Object.assign(global, { innerWidth: 500 });

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

        renderComponent(<ContributionSection />);
      });

      it("renders isMobile is true", () => {
        const container = screen.getByTestId("contribution-section-container");
        expect(container).toHaveStyle({
          marginTop: "0",
          width: "110%",
        });
      });
    });

    describe("desktop", () => {
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

        Object.assign(global, { innerWidth: 1200 });

        renderComponent(<ContributionSection />);
      });

      it("when isMobile is false", () => {
        const container = screen.getByTestId("contribution-section-container");
        expect(container).toHaveStyle({
          marginTop: "48px",
          width: "100%",
        });
      });
    });
  });
});
