import { renderComponent } from "config/testUtils/renders";
import {
  expectLogEventToHaveBeenCalledWith,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { waitForPromises } from "config/testUtils";
import SentMagicLinkEmailPage from ".";

jest.mock("@ribon.io/shared/hooks", () => ({
  __esModule: true,
  ...jest.requireActual("@ribon.io/shared/hooks"),
  useAuthentication: () => ({
    signInWithMagicLink: jest.fn(),
  }),
}));

describe("SignInMagicLinkEmailPage", () => {
  it("renders without error", async () => {
    renderComponent(<SentMagicLinkEmailPage />);
    await waitForPromises();

    expectTextToBeInTheDocument("We sent you a sign in link");
    expectTextToBeInTheDocument("Click the link sent to");
    expectTextToBeInTheDocument("to sign in to your account");
  });

  it("should call logEvent with correct params", async () => {
    renderComponent(<SentMagicLinkEmailPage />);

    await waitForPromises();

    expectLogEventToHaveBeenCalledWith("P29_view", {
      from: "direct_flow",
    });
  });
});
