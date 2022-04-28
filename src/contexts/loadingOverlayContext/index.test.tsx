import {
  clickOn,
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import { useLoadingOverlay } from ".";

function LoadingOverlayTestPage() {
  const { showLoadingOverlay, hideLoadingOverlay } = useLoadingOverlay();

  return (
    <div>
      <button type="button" onClick={() => hideLoadingOverlay()}>
        hide
      </button>
      <button type="button" onClick={() => showLoadingOverlay("test message")}>
        show
      </button>
    </div>
  );
}

describe("useLoadingOverlay", () => {
  it("renders without error", () => {
    renderComponent(<LoadingOverlayTestPage />);
    expectTextToBeInTheDocument("hide");
    expectTextToBeInTheDocument("show");
  });

  describe("when show loading overlay is used", () => {
    it("shows the loading overlay with correct message", () => {
      renderComponent(<LoadingOverlayTestPage />);

      clickOn("show");
      expectTextToBeInTheDocument("test message");
    });
  });

  describe("when hide loading overlay is used", () => {
    it("hides the loading overlay", () => {
      renderComponent(<LoadingOverlayTestPage />);

      clickOn("show");
      expectTextToBeInTheDocument("test message");
      clickOn("hide");
      expectTextNotToBeInTheDocument("test message");
    });
  });
});
