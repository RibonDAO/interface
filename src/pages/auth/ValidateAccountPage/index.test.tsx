import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import ValidateAccountPage from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

describe("ValidateAccountPage", () => {
  it("should render without error", () => {
    renderComponent(<ValidateAccountPage />);

    expectTextToBeInTheDocument("Validate your account");
  });
});
