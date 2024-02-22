import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import DownloadAppBanner from ".";

describe("Banner Component", () => {
  it("renders DownloadAppBanner with no errors", () => {
    renderComponent(<DownloadAppBanner />);
    expectTextToBeInTheDocument("Check your unlocked profile in Ribon‘s app");
    expectTextToBeInTheDocument(
      "Download now and keep up with you beautiful donation journey!",
    );
  });
});
