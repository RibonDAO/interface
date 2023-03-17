import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import AppDownloadSection from ".";

describe("AppDownloadSection", () => {
  it("should render without error", () => {
    renderComponent(
      <AppDownloadSection
        title="AppDownloadSection"
        image=""
        firstButton={{
          text: "AppDownloadSection",
        }}
      />,
    );

    expectTextToBeInTheDocument("AppDownloadSection");
  });
});
