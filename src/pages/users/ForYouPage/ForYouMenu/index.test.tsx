import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ForYouMenu from ".";

describe("ForYouMenu", () => {
  it("should render without error", () => {
    renderComponent(<ForYouMenu />);

    expectTextToBeInTheDocument("Posts");
  });
});
