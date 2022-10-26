import { renderComponent } from "config/testUtils";
import {
  expectTextToBeInTheDocument,
  expectLogEventToHaveBeenCalledWith,
} from "config/testUtils/expects";

import CryptoSection from ".";

describe("CryptoSection", () => {
  describe("When the wallet is connected", () => {
    beforeEach(async () => {
      renderComponent(<CryptoSection />, {
        walletProviderValue: {
          wallet: "0xFFFF",
        },
      });
    });

    it("should render without error", () => {
      expectTextToBeInTheDocument("How much do you want to give?*");
    });
  });

  describe("When the wallet is not connected", () => {
    beforeEach(async () => {
      renderComponent(<CryptoSection />);
    });

    it("should render without error", () => {
      expectTextToBeInTheDocument("Connect your wallet");
      expectTextToBeInTheDocument("Connect wallet");
    });

    it("logs the treasureSupportWalletRequest_view event", () => {
      expectLogEventToHaveBeenCalledWith("treasureSupportWalletRequest_view");
    });
  });
});
