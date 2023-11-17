import { renderComponent } from "config/testUtils";
import { expectTextNotToBeInTheDocument } from "config/testUtils/expects";
import AuthPage from ".";

describe("AuthPage", () => {
  it("should render without error", () => {
    renderComponent(<AuthPage />);

    expectTextNotToBeInTheDocument("AuthPage");
  });
});
