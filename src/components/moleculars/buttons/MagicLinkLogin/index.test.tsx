import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import MagicLinkLogin from ".";

describe("MagicLinkLogin", () => {
  it("should render without error", () => {
    renderComponent(<MagicLinkLogin onContinue={() => ({})} />);

    expectTextToBeInTheDocument("Continue with e-mail");
  });
});
