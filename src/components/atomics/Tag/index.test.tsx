import { renderComponent } from "config/testUtils/renders";
import Tag from "components/atomics/Tag/index";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";

describe("Tag", () => {
  it("renders without error", () => {
    renderComponent(<Tag text="test" />);
    expectTextToBeInTheDocument("test");
  });
});
