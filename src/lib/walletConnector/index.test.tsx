import { POLYGON_MUMBAI_TEST_NET_CHAIN_ID } from "config/chains/permittedChains";
import { expectLogErrorToHaveBeenCalled } from "config/testUtils/expects";
import {
  checkConnectionRequest,
  connectWalletRequest,
  getChain,
  onAccountChange,
  USER_REJECTED_CONNECTION_ERROR_CODE,
  validChain,
} from ".";

describe("#walletConnector", () => {
  describe("#connectWalletRequest", () => {
    const mockFunction = jest.fn();

    describe("when there is an ethereum object", () => {
      beforeEach(() => {
        window.ethereum = {
          request: mockFunction,
        };
      });
      it("calls the ethereum.request method with right params", () => {
        connectWalletRequest({});

        expect(mockFunction).toHaveBeenCalledWith({
          method: "eth_requestAccounts",
        });
      });
    });

    describe("when there is no ethereum object", () => {
      beforeEach(() => {
        window.ethereum = null;
      });

      it("calls the #onEthereumNotFound callback", () => {
        connectWalletRequest({ onEthereumNotFound: mockFunction });

        expect(mockFunction).toHaveBeenCalled();
      });
    });

    describe("when the user rejects the connection", () => {
      beforeEach(() => {
        window.ethereum = {
          request: () => {
            const error = new Error() as any;
            error.code = USER_REJECTED_CONNECTION_ERROR_CODE;
            throw error;
          },
        };
      });

      it("calls the #onEthereumNotFound callback", () => {
        connectWalletRequest({ onUserRejectedConnection: mockFunction });

        expect(mockFunction).toHaveBeenCalled();
      });
    });

    describe("when an error occurs", () => {
      beforeEach(() => {
        window.ethereum = {
          request: () => {
            throw new Error();
          },
        };
      });

      it("calls the #onEthereumNotFound callback", () => {
        connectWalletRequest({ onError: mockFunction });

        expect(mockFunction).toHaveBeenCalled();
      });
    });
  });

  describe("#checkConnectionRequest", () => {
    const mockFunction = jest.fn();
    const firstAccountAddress = "0x001";

    describe("when there are accounts", () => {
      beforeEach(() => {
        window.ethereum.request = mockFunction.mockReturnValue([
          firstAccountAddress,
        ]);
      });

      it("calls the ethereum.request method with right params", () => {
        checkConnectionRequest();

        expect(mockFunction).toHaveBeenCalledWith({ method: "eth_accounts" });
      });

      it("returns the first account", async () => {
        const result = await checkConnectionRequest();

        expect(result).toEqual(firstAccountAddress);
      });
    });

    describe("when there are no accounts", () => {
      beforeEach(() => {
        window.ethereum.request = mockFunction.mockReturnValue(null);
      });

      it("returns null", async () => {
        const result = await checkConnectionRequest();

        expect(result).toBeNull();
      });
    });

    describe("when an error occurs with the request", () => {
      beforeEach(() => {
        window.ethereum.request = mockFunction.mockImplementation(() => {
          throw new Error();
        });
      });

      it("calls the log error function with the error", async () => {
        await checkConnectionRequest();

        expectLogErrorToHaveBeenCalled();
      });
    });
  });

  describe("#getChain", () => {
    const mockFunction = jest.fn();
    const mockOnFunction = jest.fn();
    const mockHandleChainChanged = jest.fn();
    const CHAIN_ID = "0x1377";

    describe("when there is no ethereum object", () => {
      it("returns null", async () => {
        window.ethereum = null;
        const result = await getChain();

        expect(result).toBeNull();
      });
    });

    describe("when there is a chain", () => {
      beforeEach(() => {
        window.ethereum = {
          request: mockFunction.mockReturnValue(CHAIN_ID),
          on: mockOnFunction,
        };
      });

      it("calls the ethereum.request method with correct params", () => {
        getChain();

        expect(mockFunction).toHaveBeenCalledWith({ method: "eth_chainId" });
      });

      it("calls the ethereum.on method with correct params", async () => {
        await getChain(mockHandleChainChanged);

        expect(mockOnFunction).toHaveBeenCalledWith(
          "chainChanged",
          mockHandleChainChanged,
        );
      });

      it("returns the chain id", async () => {
        const result = await getChain();

        expect(result).toEqual(CHAIN_ID);
      });
    });

    describe("when an error occurs with the request", () => {
      beforeEach(() => {
        window.ethereum.request = mockFunction.mockImplementation(() => {
          throw new Error();
        });
      });

      it("calls the log error function with the error", async () => {
        await checkConnectionRequest();

        expectLogErrorToHaveBeenCalled();
      });
    });
  });

  describe("#validChain", () => {
    describe("when the chain is permitted", () => {
      const VALID_CHAIN_ID = POLYGON_MUMBAI_TEST_NET_CHAIN_ID;

      it("returns true", () => {
        expect(validChain(VALID_CHAIN_ID)).toBeTruthy();
      });
    });

    describe("when the chain is not permitted", () => {
      const INVALID_CHAIN_ID = "0x000";

      it("returns true", () => {
        expect(validChain(INVALID_CHAIN_ID)).toBeFalsy();
      });
    });
  });

  describe("#onAccountChanged", () => {
    const mockCallbackFunction = jest.fn();
    const mockOnFunction = jest.fn();

    describe("when there is no ethereum object", () => {
      beforeEach(() => {
        window.ethereum = null;
      });

      it("returns undefined", () => {
        expect(onAccountChange(mockCallbackFunction)).toBeUndefined();
      });
    });

    describe("when there is an ethereum object", () => {
      beforeEach(() => {
        window.ethereum = { on: mockOnFunction };
      });

      it("calls the ethereum.on with correct params", () => {
        onAccountChange(mockCallbackFunction);

        expect(mockOnFunction).toHaveBeenCalledWith(
          "accountsChanged",
          mockCallbackFunction,
        );
      });
    });
  });
});
