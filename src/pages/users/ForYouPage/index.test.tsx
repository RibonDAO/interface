import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ForYouPage from ".";

describe("ForYouPage", () => {
  it("should render without error", () => {
    renderComponent(<ForYouPage />);

    expectTextToBeInTheDocument("Get the app and check out what's new for you");
  });
});
