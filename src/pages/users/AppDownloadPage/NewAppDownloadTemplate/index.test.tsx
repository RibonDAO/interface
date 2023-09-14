import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import NewAppDownloadTemplate from ".";

describe("AppDownloadTemplate", () => {
  it("should render without error", () => {
    renderComponent(
      <NewAppDownloadTemplate
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
