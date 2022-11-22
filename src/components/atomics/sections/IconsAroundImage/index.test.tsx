import { screen } from "@testing-library/react";
import { renderComponent } from "config/testUtils";
import IconsAroundImage from ".";

describe("IconsAroundImage", () => {
  it("should render without error", () => {
    renderComponent(<IconsAroundImage imageSrc="https://picsum.photos/200" />);

    expect(screen.queryAllByTestId("animations-container")).toHaveLength(1);
  });
});
