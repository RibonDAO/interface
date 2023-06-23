import React from "react";
import { render, screen } from "@testing-library/react";
import { useImpactConversion } from "hooks/useImpactConversion";
import { renderComponent } from "config/testUtils";
import ContributionSection from ".";

jest.mock("hooks/useImpactConversion", () => ({
  __esModule: true,
  useImpactConversion: jest.fn(),
}));

describe("ContributionSection", () => {
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

    expect(
      screen.getByText("Que incrível! Obrigado por ajudar Test Non-Profit"),
    ).toBeInTheDocument();
    expect(screen.getByText("This is a test impact")).toBeInTheDocument();
    expect(screen.getByText("Doe R$ 100")).toBeInTheDocument();
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

    render(<ContributionSection />);

    expect(
      screen.queryByText("Que incrível! Obrigado por ajudar Test Non-Profit"),
    ).toBeNull();
    expect(screen.queryByText("This is a test impact")).toBeNull();
    expect(screen.queryByText("Doe R$ 100")).toBeNull();
  });

  test("does not render contribution card when contribution is null", () => {
    const mockUseImpactConversion = useImpactConversion as jest.Mock;
    mockUseImpactConversion.mockReturnValue({
      contribution: null,
      nonProfit: { name: "Test Non-Profit" },
      offer: { id: 1 },
      description: "This is a test description",
      variation: "Test Variation",
    });

    render(<ContributionSection />);

    expect(
      screen.queryByText("Que incrível! Obrigado por ajudar Test Non-Profit"),
    ).toBeNull();
    expect(screen.queryByText("This is a test impact")).toBeNull();
    expect(screen.queryByText("Doe R$ 100")).toBeNull();
  });
});
