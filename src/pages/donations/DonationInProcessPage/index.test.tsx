import { renderComponent, waitForPromises } from "config/testUtils";
import { mockRequest } from "config/testUtils/test-helper";
import {
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import DonationInProcessPage from ".";

describe("DonationInProcessPage", () => {
  const integration = { id: 1 };
  const nonProfit = { id: 1 };

  mockRequest("/api/v1/users/1/donations_count", {
    payload: { donationsCount: 1 },
  });

  it("should render without error", () => {
    renderComponent(<DonationInProcessPage />);

    expectTextToBeInTheDocument("Donating...");
    expectTextToBeInTheDocument(
      "This donation is funded by Ribon’s Donation Treasure",
    );
  });

  describe("when the donation is succeeded", () => {
    beforeEach(() => {
      mockRequest("/api/v1/donations", {
        payload: {},
        status: 201,
        method: "POST",
      });
    });

    it("goes to the donation finish page", async () => {
      renderComponent(<DonationInProcessPage />, {
        currentUserProviderValue: {
          currentUser: { email: "user@email.com", id: 1 },
        },
        locationState: {
          integration,
          nonProfit,
        },
      });
      await waitForPromises();

      expectPageToNavigateTo("/donation-done", {
        state: { nonProfit },
      });
    });
  });

  describe("when the donation fails", () => {
    beforeEach(() => {
      mockRequest("/api/v1/donations", {
        payload: {},
        status: 422,
        method: "POST",
      });
    });

    it("goes to the root page with failed donation", async () => {
      renderComponent(<DonationInProcessPage />, {
        currentUserProviderValue: {
          currentUser: { email: "user@email.com", id: 1 },
        },
        locationState: {
          integration,
          nonProfit,
        },
      });
      await waitForPromises();

      expectPageToNavigateTo("/", { state: { failedDonation: true } });
    });
  });

  describe("when the donation fails with 403", () => {
    beforeEach(() => {
      mockRequest("/api/v1/donations", {
        payload: {},
        status: 403,
        method: "POST",
      });
    });

    it("goes to the root page with blocked donation", async () => {
      renderComponent(<DonationInProcessPage />, {
        currentUserProviderValue: {
          currentUser: { email: "user@email.com", id: 1 },
        },
        locationState: {
          integration,
          nonProfit,
        },
      });
      await waitForPromises();

      expectPageToNavigateTo("/", { state: { blockedDonation: true } });
    });
  });
});
