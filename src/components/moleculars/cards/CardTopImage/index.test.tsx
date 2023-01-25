import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardTopImage from ".";

describe("CardTopImage", () => {
  it("should render without error", () => {
    renderComponent(<CardTopImage icon="" value={0} text="texto" />);

    expectImageToBeInTheDocument("image");
    expectTextToBeInTheDocument("texto");
  });
});
