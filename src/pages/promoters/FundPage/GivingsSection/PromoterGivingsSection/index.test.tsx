import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import promoterDonationFactory from "config/testUtils/factories/promoterDonationFactory";
import { mockGraphqlRequest } from "config/testUtils/test-helper";
import { PROMOTER_DONATIONS_ID_QUERY_NAME } from "services/apiTheGraph/querys/promoterDonation";
import PromoterGivingsSection from ".";

describe("PromoterGivingsSection", () => {
  it("should render without error", () => {
    renderComponent(<PromoterGivingsSection />);

    expectTextToBeInTheDocument("Your givings");
  });

  describe("when there is a wallet connected", () => {
    describe("when the promoter has no givings", () => {
      beforeEach(async () => {
        renderComponent(<PromoterGivingsSection />, {
          walletProviderValue: {
            wallet: "0xFFFF",
          },
        });

        await waitForPromises();
      });

      it("render make a giving card", () => {
        expectTextToBeInTheDocument("Make a giving and you’ll see it here");
      });

      describe.skip("when the show your givings card is clicked", () => {
        beforeEach(() => {
          clickOn("Show your givings");
        });

        it("logs the fundShowGivingsListBtn_click event", () => {
          expectLogEventToHaveBeenCalledWith("fundShowGivingsListBtn_click", {
            from: "yourGivingsCarousel",
          });
        });

        it("navigates to the you givings page", () => {
          expectPageToNavigateTo("/promoters/show-givings");
        });
      });
    });

    describe("when the promoter has givings", () => {
      beforeEach(async () => {
        const fiftyCentInWei = "500000000000000000";
        mockGraphqlRequest(PROMOTER_DONATIONS_ID_QUERY_NAME, {
          promoterDonations: [
            promoterDonationFactory({
              amountDonated: fiftyCentInWei,
            }),
          ],
        });

        renderComponent(<PromoterGivingsSection />, {
          walletProviderValue: {
            wallet: "0xFFFF",
          },
        });

        await waitForPromises();
      });

      it("shows the user givings", async () => {
        expectTextToBeInTheDocument("See transaction");
        expectTextToBeInTheDocument("5/18/2022");
        expectTextToBeInTheDocument("0.50");
      });
    });
  });

  describe("when there is no wallet connected", () => {
    const connectWalletMock = jest.fn();

    beforeEach(() => {
      renderComponent(<PromoterGivingsSection />, {
        walletProviderValue: {
          connectWallet: connectWalletMock,
        },
      });
    });

    it("render make a giving card", () => {
      expectTextToBeInTheDocument("Make a giving and you’ll see it here");
    });
  });
});
