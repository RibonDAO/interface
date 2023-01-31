import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import CardTopImage from ".";

describe("CardTopImage", () => {
  it("should render without error", () => {
    renderComponent(<CardTopImage icon="" title={0} text="texto" />);

    expectTextToBeInTheDocument("texto");
  });
});
