import { renderComponent } from "config/testUtils/renders";
import {
  expectTextNotToBeInTheDocument,
  expectTextToBeInTheDocument,
} from "config/testUtils/expects";
import { clickOn } from "config/testUtils";
import WalletLayout from ".";

describe("WalletLayout", () => {
  it("renders the children passed", () => {
    renderComponent(
      <WalletLayout>
        <div>test</div>
      </WalletLayout>,
    );

    expectTextToBeInTheDocument("test");
  });

  it("shows the navigation", () => {
    renderComponent(
      <WalletLayout>
        <div>test</div>
      </WalletLayout>,
    );

    expectTextToBeInTheDocument("Giving");
    expectTextToBeInTheDocument("Tickets");
    expectTextToBeInTheDocument("Impact");
  });

  describe("when the wallet is connected", () => {
    beforeEach(() => {
      renderComponent(
        <WalletLayout hideNavigation>
          <div>test</div>
        </WalletLayout>,
        {
          walletProviderValue: {
            wallet: "0x6E060041D62fDd76cF27c582f62983b864878E8F",
          },
          networkProviderValue: {
            isValidNetwork: true,
          },
        },
      );
    });

    it("shows the truncated wallet", () => {
      expectTextToBeInTheDocument("0x6E...8E8F");
    });
  });

  describe("when the wallet is not connected", () => {
    const mockConnectWallet = jest.fn();

    beforeEach(() => {
      renderComponent(
        <WalletLayout hideNavigation>
          <div>test</div>
        </WalletLayout>,
        {
          walletProviderValue: {
            connectWallet: mockConnectWallet,
          },
        },
      );
    });

    it("shows the connect wallet button", () => {
      expectTextToBeInTheDocument("Connect");
    });

    describe("when the connect button is clicked", () => {
      it("calls the connect wallet method", () => {
        clickOn("Connect");
        expect(mockConnectWallet).toHaveBeenCalled();
      });
    });
  });

  describe("when hide navigation is passed", () => {
    it("hides the navigation section", () => {
      renderComponent(
        <WalletLayout hideNavigation>
          <div>test</div>
        </WalletLayout>,
      );

      expectTextNotToBeInTheDocument("Giving");
      expectTextNotToBeInTheDocument("Causes");
      expectTextNotToBeInTheDocument("Impact");
    });
  });
});
