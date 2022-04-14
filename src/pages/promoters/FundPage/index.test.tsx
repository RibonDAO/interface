import {
  clickOn,
  expectLogEventToHaveBeenCalledWith,
  expectPageToNavigateTo,
  expectTextToBeInTheDocument,
  renderComponent,
} from "config/testUtils";
import FundPage from ".";

describe("FundPage", () => {
  it("should render without error", () => {
    renderComponent(<FundPage />);

    expectTextToBeInTheDocument("Fund");
  });

  it("logs the fundScreen_view event when loaded", () => {
    renderComponent(<FundPage />);

    expectLogEventToHaveBeenCalledWith("fundScreen_view");
  });

  describe("when there is a wallet connected", () => {
    beforeEach(() => {
      renderComponent(<FundPage />, {
        walletProviderValue: {
          wallet: "0xFFFF",
        },
      });
    });

    describe("when the support fund button is clicked", () => {
      beforeEach(() => {
        clickOn("Support the fund");
      });

      it("logs the fundConWalletBtn_click event", () => {
        expectLogEventToHaveBeenCalledWith("fundConWalletBtn_click", {
          from: "supportButton",
        });
      });

      it("logs the fundSupportBtn_click event", () => {
        expectLogEventToHaveBeenCalledWith("fundSupportBtn_click", {
          from: "fundBalance",
        });
      });

      it("navigates to the support fund page", () => {
        expectPageToNavigateTo("/promoters/support-fund");
      });
    });
  });

  describe("when there is no wallet connected", () => {
    const connectWalletMock = jest.fn();

    beforeEach(() => {
      renderComponent(<FundPage />, {
        walletProviderValue: {
          connectWallet: connectWalletMock,
        },
      });
    });

    describe("when the support fund button is clicked", () => {
      beforeEach(() => {
        clickOn("Support the fund");
      });

      it("calls the connect wallet request", () => {
        expect(connectWalletMock).toHaveBeenCalled();
      });
    });
  });
});
