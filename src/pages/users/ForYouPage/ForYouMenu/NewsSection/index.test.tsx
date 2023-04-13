import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import NewsSection from ".";

describe("NewsSection", () => {
  it("should render without error", () => {
    renderComponent(<NewsSection />);

    expectTextToBeInTheDocument("Get the app and check out what's new for you");
  });
});
