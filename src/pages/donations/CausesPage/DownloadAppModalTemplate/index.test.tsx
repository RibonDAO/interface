import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import DownloadAppModalTemplate from ".";

describe("DownloadAppModalTemplate", () => {
  beforeEach(() => {
    renderComponent(<DownloadAppModalTemplate />);
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Get Ribon's mobile app");
  });

  it("renders the description", () => {
    expectTextToBeInTheDocument(
      "Get the best donation experience we can offer and access exclusive features!",
    );
  });

  it("renders the download button", () => {
    expectTextToBeInTheDocument("Download app");
  });
});
