import { changeInputValue } from "config/testUtils/test-helper";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn, renderComponent } from "config/testUtils";
import { screen } from "@testing-library/react";
import InputAutoComplete from ".";

describe("InputAutoComplete", () => {
  let input: any;
  const br = "brazil";

  beforeEach(() => {
    renderComponent(
      <InputAutoComplete
        name="country"
        suggestions={["brazil", "argentina"]}
        placeholder="country"
      />,
    );
    input = screen.getByRole("textbox", { name: "country" });
  });

  it("should render without error", () => {
    expect(screen.queryAllByPlaceholderText("country")).toHaveLength(1);
  });

  it("should show related input suggestion", () => {
    changeInputValue(input, "br");
    expectTextToBeInTheDocument(br);
    expectTextNotToBeInTheDocument("argentina");
  });

  it("should update input value when option is clicked", () => {
    changeInputValue(input, "br");
    clickOn(br);
    expect(input).toHaveAttribute("value", "brazil");
  });
});
