import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InlineNotification from ".";

describe("InlineNotification", () => {
  it("should render without error", () => {
    renderComponent(
      <InlineNotification
        type="success"
        title="Title"
        description="InlineNotification"
        link1="Link 1"
        link2="Link 2"
      />,
    );

    expectTextToBeInTheDocument("InlineNotification");
  });
});
