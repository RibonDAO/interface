import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import InsertEmailCouponPage from ".";

describe("SignInCouponPage", () => {
  beforeEach(() => {
    renderComponent(<InsertEmailCouponPage />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument(
      "Enter the e-mail where you want to receive the tickets",
    );
    expectTextToBeInTheDocument("Continue");
    expectTextToBeInTheDocument("E-mail");
  });

  it("logs the P28_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P28_view", {
      from: "coupon_flow",
    });
  });
});
