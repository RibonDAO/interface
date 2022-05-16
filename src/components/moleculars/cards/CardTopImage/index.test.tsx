import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardTopImage from ".";

describe("CardTopImage", () => {
  it("should render without error", () => {
    renderComponent(<CardTopImage imageUrl="" imageAlt="image" text="texto" />);

    expectImageToBeInTheDocument("image");
    expectTextToBeInTheDocument("texto");
  });
});
