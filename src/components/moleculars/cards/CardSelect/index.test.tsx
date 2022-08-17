import { renderComponent } from "config/testUtils";
import {
  expectInputToHaveValue,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardSelect from ".";

describe("CardSelect", () => {
  beforeEach(() => {
    renderComponent(
      <CardSelect
        dropdownProps={{
          name: "dropdown",
          label: "dropdown",
          values: ["value 1"],
        }}
      >
        <div>children</div>
      </CardSelect>,
    );
  });

  it("renders the children props", () => {
    expectTextToBeInTheDocument("children");
  });

  it("renders the dropdown props", () => {
    expectTextToBeInTheDocument("dropdown");
    expectInputToHaveValue("dropdown", "value 1");
  });
});
