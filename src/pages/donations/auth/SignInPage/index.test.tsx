import { nonProfitFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SignInSection from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

jest.mock(
  "./AppleSection",
  () =>
    function () {
      return <div />;
    },
);

describe("SignInSection", () => {
  const nonProfit = nonProfitFactory();

  beforeEach(() => {
    renderComponent(<SignInSection />, {
      locationState: {
        nonProfit,
      },
    });
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("you are donating");
  });

  it("logs the P27_view event", async () => {
    waitForPromises();
    expectLogEventToHaveBeenCalledWith("P27_view", {
      nonProfitId: nonProfit.id,
    });
  });
});
