import { clickOn, renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { screen } from "@testing-library/react";
import Checkbox from ".";

describe("Checkbox", () => {
  it("should render without errors", () => {
    renderComponent(<Checkbox text="test" />);
    expectTextToBeInTheDocument("test");
  });

  it("should render with lint through on checked", () => {
    renderComponent(<Checkbox text="test" lineThroughOnChecked />);

    clickOn("test");
    expect(screen.getByText(/test/i)).toHaveStyle(
      "text-decoration: line-through",
    );

    clickOn("test");
    expect(screen.getByText(/test/i)).not.toHaveStyle(
      "text-decoration: line-through",
    );
  });
});
