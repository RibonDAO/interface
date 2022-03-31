import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import CardTopImage from ".";

describe("CardTopImage", () => {
  it("should render without error", () => {
    renderComponent(<CardTopImage imageUrl="" imageAlt="image" text="texto" />);

    expectImageToBeInTheDocument("image");
    expectTextToBeInTheDocument("texto");
  });
});
