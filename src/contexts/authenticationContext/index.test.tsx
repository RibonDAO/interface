import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import { useAuthentication } from ".";

function AuthenticationTestPage() {
  useAuthentication();
  return <div>Authentication</div>;
}

describe("useAuthentication", () => {
  it("renders without error", () => {
    renderComponent(<AuthenticationTestPage />);
    expectTextToBeInTheDocument("Authentication");
  });
});
