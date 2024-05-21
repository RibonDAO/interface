import { renderComponent } from "config/testUtils/renders";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import ExpiredCouponPage from ".";

describe("ExpiredCouponPage", () => {
  beforeEach(() => {
    renderComponent(<ExpiredCouponPage />, {
      couponProviderValue: {
        couponId: "1",
      },
    });
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Unavailable ticket");
    expectTextToBeInTheDocument(
      "Either you have already collected this ticket or it has expired.",
    );
    expectTextToBeInTheDocument("Go back to the home screen");
  });

  it("redirect when button is clicked", () => {
    clickOn("Go back to the home screen");

    expectPageToNavigateTo("/causes");
  });
});
