import { nonProfitFactory } from "@ribon.io/shared/config";
import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import SignInSection from ".";

describe("SignInSection", () => {
  const nonProfit = nonProfitFactory();

  beforeEach(() => {
    renderComponent(<SignInSection nonProfit={nonProfit} />);
  });

  it("should render without error", () => {
    expectTextToBeInTheDocument("Continue with google");
    expectTextToBeInTheDocument("Continue with apple");
    expectTextToBeInTheDocument("Continue with e-mail");
  });

  it("logs the P27_view event", () => {
    expectLogEventToHaveBeenCalledWith("P27_view", {
      nonProfitId: nonProfit.id,
    });
  });
});
