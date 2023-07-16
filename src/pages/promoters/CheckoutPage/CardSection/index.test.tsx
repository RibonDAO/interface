import { renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import CardSection from ".";

describe("CardSection", () => {
  it("should render without error", () => {
    renderComponent(<CardSection />);

    expect(screen.queryAllByTestId("checkout-page-loader")).toHaveLength(1);
  });
});
