import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils/renders";
import ImageWithIconOverlay from ".";

describe("ImageWithIconOverlay", () => {
  it("should render without error", () => {
    renderComponent(
      <ImageWithIconOverlay leftImage="image" rightImage="image" />,
    );

    expect(screen.getByTestId("leftImage")).toBeTruthy();
    expect(screen.getByTestId("rightImage")).toBeTruthy();
  });
});
