import { useImpactConversion } from "hooks/useImpactConversion";
import { renderComponent } from "config/testUtils";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import offerFactory from "config/testUtils/factories/offerFactory";
import CampaignSection from ".";

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

jest.mock("hooks/useImpressionCards", () => ({
  __esModule: true,
  default: () => ({
    getImpressionCard(id: string) {
      return {
        id,
        headline: "Test Headline",
        title: "Test Title",
        description: "Test Description",
        ctaText: "Participate in the campaign",
        ctaUrl: "Test CTA Url",
        active: true,
      };
    },
  }),
}));

describe("CampaignSection", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("when has contribution", () => {
    beforeEach(() => {
      const mockUseImpactConversion = useImpactConversion as jest.Mock;
      mockUseImpactConversion.mockReturnValue({
        contribution: {
          image: "test-image-url",
          impact: "This is a test impact",
          value: 100,
        },
        nonProfit: { name: "Test Non-Profit" },
        offer: offerFactory(),
        description: "This is a test description",
        variation: "Test Variation",
      });

      renderComponent(<CampaignSection cardId="1" />);
    });
    it("renders contribution card ", () => {
      expectTextToBeInTheDocument(
        "Amazing! Thank you for helping Test Non-Profit",
      );
      expectTextToBeInTheDocument("Participate in the campaign");
    });
  });

  describe("when has no contribution", () => {
    describe("when contribution is null", () => {
      beforeEach(() => {
        const mockUseImpactConversion = useImpactConversion as jest.Mock;
        mockUseImpactConversion.mockReturnValue({
          contribution: null,
          nonProfit: { name: "Test Non-Profit" },
          offer: offerFactory(),
          description: "This is a test description",
          variation: "Control",
        });

        renderComponent(<CampaignSection cardId="1" />);
      });
      it("do not renders contribution card", () => {
        expectTextNotToBeInTheDocument(
          "Amazing! Thank you for helping Test Test Non-Profit",
        );
        expectTextNotToBeInTheDocument("This is a test impact");
        expectTextNotToBeInTheDocument("Donate $100");
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
          offer: offerFactory(),
          description: "This is a test description",
          variation: "Test Variation",
        });

        renderComponent(<CampaignSection cardId="1" />);
      });

      it("renders isMobile is true", () => {
        const container = screen.getByTestId("contribution-section-container");
        expect(container).toHaveStyle({
          borderRadius: "0",
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
          offer: offerFactory(),
          description: "This is a test description",
          variation: "Test Variation",
        });

        Object.assign(global, { innerWidth: 1200 });

        renderComponent(<CampaignSection cardId="1" />);
      });

      it("when isMobile is false", () => {
        const container = screen.getByTestId("contribution-section-container");
        expect(container).toHaveStyle({
          width: "100%",
        });
      });
    });
  });
});
