import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import Title from ".";

describe("Title", () => {
  it("should render without error", () => {
    renderComponent(
      <Title title="Title" icon={{ name: "bolt" }} secondaryColor="white" />,
    );

    expectTextToBeInTheDocument("Title");
  });
});
