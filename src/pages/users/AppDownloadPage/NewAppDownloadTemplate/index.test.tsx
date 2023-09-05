import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import AppDownloadTemplate from ".";

describe("AppDownloadTemplate", () => {
  it("should render without error", () => {
    renderComponent(
      <AppDownloadTemplate
        title="AppDownloadTemplate"
        image=""
        firstButton={{
          text: "AppDownloadTemplate",
        }}
      />,
    );

    expectTextToBeInTheDocument("AppDownloadTemplate");
  });
});
