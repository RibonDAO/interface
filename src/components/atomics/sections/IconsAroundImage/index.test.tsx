import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import IconsAroundImage from ".";

describe("IconsAroundImage", () => {
  it("should render without error", () => {
    renderComponent(<IconsAroundImage imageSrc="https://picsum.photos/200" />);

    expectTextToBeInTheDocument("IconsAroundImage");
  });
});
