import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import InsertEmailPage from ".";

describe("InsertEmailAccountPage", () => {
  beforeEach(() => {
    renderComponent(<InsertEmailPage />);
  });

  it("should render initail message", () => {
    expectTextToBeInTheDocument("Sign in with an e-mail");
  });

  it("Continue button should be in the page", () => {
    expectTextToBeInTheDocument("Continue");
  });
});
