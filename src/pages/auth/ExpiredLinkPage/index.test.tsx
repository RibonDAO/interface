import { waitFor } from "@testing-library/react";
import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import ExpiredLinkPage from ".";

describe("ExpiredLinkPage", () => {
  it("should render without error", () => {
    renderComponent(<ExpiredLinkPage />);
    expectTextToBeInTheDocument("This link has expired");
    expectTextToBeInTheDocument(
      "Please, try signing in or creating a new account with your e-mail to get a new account validation link",
    );
    expectTextToBeInTheDocument("Send me a new link");
  });

  it("should logs an event when renders", () => {
    renderComponent(<ExpiredLinkPage />);
    expectLogEventToHaveBeenCalledWith("P30_view");
  });

  describe("when click on button", () => {
    it("should call function when click on button", async () => {
      const mockSendAuthenticationEmail = jest.fn(
        async () => "test@example.com",
      );

      renderComponent(<ExpiredLinkPage />, {
        authenticationProviderValue: {
          sendAuthenticationEmail: mockSendAuthenticationEmail,
        },
      });
      await waitForPromises();
      clickOn("Send me a new link");
      await waitFor(() => {
        expectPageToNavigateTo("/auth/sent-magic-link-email", {
          state: { email: "test@example.com" },
        });
      });
    });
  });
});
