import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Subtitle from ".";

describe("Subtitle", () => {
  it("should render without error", () => {
    renderComponent(
      <Subtitle
        text="Subtitle"
        icon={{ name: "bolt" }}
        secondaryColor="white"
      />,
    );

    expectTextToBeInTheDocument("Subtitle");
  });
});
