import { renderComponent } from "config/testUtils";
import { expectTextNotToBeInTheDocument } from "config/testUtils/expects";
import SignInByMagicLinkPage from ".";

describe("AuthPage", () => {
  it("should render without error", () => {
    renderComponent(<SignInByMagicLinkPage />);

    expectTextNotToBeInTheDocument("SignInByMagicLinkPage");
  });
});
