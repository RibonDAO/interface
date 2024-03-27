import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SignInCustomLinkPage from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

describe("SignInCustomLinkPage", () => {
  it("should render without error", () => {
    renderComponent(<SignInCustomLinkPage />);

    expectTextToBeInTheDocument(
      "Sign in to your account to create your custom link",
    );
  });
});
