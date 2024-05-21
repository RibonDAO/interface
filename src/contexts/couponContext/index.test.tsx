import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useCouponContext } from ".";

function CouponTestPage() {
  useCouponContext();
  return <div>Coupon</div>;
}

describe("useCoupon", () => {
  it("renders without error", () => {
    renderComponent(<CouponTestPage />);
    expectTextToBeInTheDocument("Coupon");
  });
});
