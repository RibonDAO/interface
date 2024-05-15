import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInCouponPage from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

jest.mock(
  "components/moleculars/buttons/AppleLogin",
  () =>
    function () {
      return <div />;
    },
);
describe("SignInCouponPage", () => {
  beforeEach(() => {
    renderComponent(<SignInCouponPage />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument(
      "Sign in the account where you want to receive the tickets",
    );
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      from: "coupon_flow",
    });
  });
});
