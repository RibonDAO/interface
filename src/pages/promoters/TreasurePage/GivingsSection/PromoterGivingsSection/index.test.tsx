import { clickOn, renderComponent, waitForPromises } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import promoterCardGivingFactory from "config/testUtils/factories/promoterCardGivingFactory";
import promoterDonationFactory from "config/testUtils/factories/promoterDonationFactory";
import userFactory from "config/testUtils/factories/userFactory";
import { formatToDecimals } from "lib/web3Helpers/etherFormatters";
import { mockGraphqlRequest, mockRequest } from "config/testUtils/test-helper";
import { PROMOTER_DONATIONS_ID_QUERY_NAME } from "services/apiTheGraph/querys/promoterDonation";
import { Currencies } from "@ribon.io/shared/types";
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

        it("logs the treasureShowGivingsListBtn_click event", () => {
          expectLogEventToHaveBeenCalledWith(
            "treasureShowGivingsListBtn_click",
            {
              from: "yourGivingsCarousel",
            },
          );
        });

        it("navigates to the you givings page", () => {
          expectPageToNavigateTo("/promoters/show-givings");
        });
      });
    });

    describe("when the promoter has crypto givings", () => {
      beforeEach(async () => {
        const fiftyCentInDecimals = formatToDecimals(0.5).toFixed(2);
        mockGraphqlRequest(PROMOTER_DONATIONS_ID_QUERY_NAME, {
          promoterDonations: [
            promoterDonationFactory({
              amountDonated: fiftyCentInDecimals,
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
        const amount = "0.50";
        const date = new Date("5/18/2022").toLocaleDateString();

        expectTextToBeInTheDocument("See transaction");
        expectTextToBeInTheDocument(date);
        expectTextToBeInTheDocument(amount);
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

describe("when the promoter has card givings", () => {
  const user = userFactory({ id: 1, email: "test@gmail.com" });
  const currency = Currencies.USD;
  const promoterCardGivings = [
    promoterCardGivingFactory({
      id: 2,
      crypto_amount: 0.5,
      paid_date: "2022-01-01 19:31:15 UTC",
    }),
    promoterCardGivingFactory({
      id: 1,
      crypto_amount: 1.5,
      paid_date: "2022-02-02 19:31:15 UTC",
    }),
  ];

  mockRequest(
    `/api/v1/givings/user_givings?email=${user.email}&currency=${currency}`,
    {
      payload: promoterCardGivings,
    },
  );

  beforeEach(async () => {
    renderComponent(<PromoterGivingsSection />, {
      currentUserProviderValue: {
        currentUser: user,
      },
      cardPaymentProviderValue: {
        currentCoin: currency,
      },
    });

    await waitForPromises();
  });

  it("shows promoter card givings", () => {
    expectTextToBeInTheDocument("01/01/2022");
    expectTextToBeInTheDocument("0.5");
    expectTextToBeInTheDocument("02/02/2022");
    expectTextToBeInTheDocument("1.5");
  });
});
