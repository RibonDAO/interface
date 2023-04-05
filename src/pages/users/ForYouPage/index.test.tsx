import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ForYouPage from ".";

describe("ForYouPage", () => {
  it("should render without error", () => {
    renderComponent(<ForYouPage />);

    expectTextToBeInTheDocument("For you");
  });
});
