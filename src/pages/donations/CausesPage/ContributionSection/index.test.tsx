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
  test("renders contribution card when variation is not 'Control' and contribution exists", () => {
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

    expectTextToBeInTheDocument(
      "Que incrível! Obrigado por ajudar Test Non-Profit",
    );
    expectTextToBeInTheDocument("This is a test impact");
    expectTextToBeInTheDocument("Doe R$ 100");
  });

  test("does not render contribution card when variation is 'Control'", () => {
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

    expectTextNotToBeInTheDocument(
      "Que incrível! Obrigado por ajudar Test Non-Profit",
    );
    expectTextNotToBeInTheDocument("This is a test impact");
    expectTextNotToBeInTheDocument("Doe R$ 100");
  });

  test("does not render contribution card when contribution is null", () => {
    const mockUseImpactConversion = useImpactConversion as jest.Mock;
    mockUseImpactConversion.mockReturnValue({
      contribution: null,
      nonProfit: { name: "Test Non-Profit" },
      offer: { id: 1 },
      description: "This is a test description",
      variation: "Control",
    });

    renderComponent(<ContributionSection />);

    expectTextNotToBeInTheDocument(
      "Que incrível! Obrigado por ajudar Test Non-Profit",
    );
    expectTextNotToBeInTheDocument("This is a test impact");
    expectTextNotToBeInTheDocument("Doe R$ 100");
  });
  test("applies mobile styles when isMobile is true", () => {
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

    const container = screen.getByTestId("contribution-section-container");
    expect(container).toHaveStyle({
      marginTop: "0",
      width: "110%",
    });
  });

  test("applies desktop styles when isMobile is false", () => {
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

    const container = screen.getByTestId("contribution-section-container");
    expect(container).toHaveStyle({
      marginTop: "48px",
      width: "100%",
    });
  });
});
