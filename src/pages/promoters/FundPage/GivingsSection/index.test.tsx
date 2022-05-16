import { clickOn, renderComponent } from "config/testUtils";
import {
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import GivingsSection from ".";

describe("GivingsSection", () => {
  it("should render without error", () => {
    renderComponent(<GivingsSection />);

    expectTextToBeInTheDocument("Your givings");
  });

  describe.skip("when there is a wallet connected", () => {
    beforeEach(() => {
      renderComponent(<GivingsSection />, {
        walletProviderValue: {
          wallet: "0xFFFF",
        },
      });
    });

    describe("when the promoter hasn't givings", () => {
      it("render give now card", () => {
        expectTextToBeInTheDocument("Give now");
      });

      describe("when the give now button is clicked", () => {
        beforeEach(() => {
          clickOn("Give now");
        });

        it("logs the fundSupportBtn_click event", () => {
          expectLogEventToHaveBeenCalledWith("fundSupportBtn_click", {
            from: "giveNow",
          });
        });

        it("navigates to the support fund page", () => {
          expectPageToNavigateTo("/promoters/support-fund");
        });
      });
    });
    describe("when the promoter hasn't givings", () => {
      describe("when the show your givings card is clicked", () => {
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
  });

  describe.skip("when there is no wallet connected", () => {
    const connectWalletMock = jest.fn();

    beforeEach(() => {
      renderComponent(<GivingsSection />, {
        walletProviderValue: {
          connectWallet: connectWalletMock,
        },
      });
    });

    describe("when the give now button is clicked", () => {
      beforeEach(() => {
        clickOn("Give now");
      });

      it("calls the connect wallet request", () => {
        expect(connectWalletMock).toHaveBeenCalled();
      });
    });
  });
});
