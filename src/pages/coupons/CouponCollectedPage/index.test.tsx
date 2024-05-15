import { renderComponent } from "config/testUtils/renders";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import CouponCollectedPage from ".";

describe("CouponCollectedPage", () => {
  beforeEach(() => {
    renderComponent(<CouponCollectedPage />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument(
      "Your tickets have been received! Return to the app to use them",
    );
    expectTextToBeInTheDocument(
      "If you don't have the Ribon app, download it to use your tickets!",
    );
    expectTextToBeInTheDocument("Get Ribon app →");
  });

  it("redirect when download button is clicked", () => {
    clickOn("Get Ribon app →");

    expectPageToNavigateTo("/app-download");
  });
});
