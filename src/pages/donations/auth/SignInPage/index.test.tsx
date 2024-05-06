import { nonProfitFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInPage from ".";

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

describe("SignInPage", () => {
  const nonProfit = nonProfitFactory();

  beforeEach(() => {
    renderComponent(<SignInPage />, {
      locationState: {
        nonProfit,
      },
    });
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("You are donating");
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      nonProfitId: nonProfit.id,
      from: "donation_flow",
    });
  });
});
