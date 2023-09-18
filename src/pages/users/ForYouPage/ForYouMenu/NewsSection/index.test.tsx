import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import NewsSection from ".";

describe("NewsSection", () => {
  it("should render without error", () => {
    renderComponent(<NewsSection />);

    expectTextToBeInTheDocument(
      "Download our app and check our selection of heart warming news",
    );
  });
});
