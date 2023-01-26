import { renderComponent } from "config/testUtils";
import {
  expectImageToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import CardTopImageText from ".";

describe("CardTopImageText", () => {
  it("should render without error", () => {
    renderComponent(
      <CardTopImageText imageUrl="" imageAlt="image" text="texto" />,
    );

    expectImageToBeInTheDocument("image");
    expectTextToBeInTheDocument("texto");
  });
});
