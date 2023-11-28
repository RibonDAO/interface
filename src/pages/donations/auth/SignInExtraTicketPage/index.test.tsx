import { renderComponent } from "config/testUtils";
import { expectTextToBeInTheDocument } from "config/testUtils/expects";
import SignInExtraTicketPage from ".";

jest.mock("@react-oauth/google", () => ({
  useGoogleLogin: () => {},
}));

describe("SignInExtraTicketPage", () => {
  it("should render without error", () => {
    renderComponent(<SignInExtraTicketPage />);

    expectTextToBeInTheDocument("You won an extra ticket");
  });
});
