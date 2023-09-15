import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import DownloadAppModalTemplate from ".";

describe("DownloadAppModalTemplate", () => {
  beforeEach(() => {
    renderComponent(<DownloadAppModalTemplate />);
  });

  it("renders the title", () => {
    expectTextToBeInTheDocument("Get a new ticket");
  });

  it("renders the description", () => {
    expectTextToBeInTheDocument("Download the app and get an extra ticket");
  });

  it("renders the download button", () => {
    expectTextToBeInTheDocument("Download app");
  });
});
