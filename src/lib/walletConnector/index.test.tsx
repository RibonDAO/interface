import { connectWalletRequest, USER_REJECTED_CONNECTION_ERROR_CODE } from ".";

describe("#walletConnector", () => {
  describe("#connectWalletRequest", () => {
    const mockFunction = jest.fn();

    describe("when there is an ethereum object", () => {
      beforeEach(() => {
        window.ethereum = {
          request: mockFunction,
        };
      });
      it("calls the ethereum.request method", () => {
        connectWalletRequest({});

        expect(mockFunction).toHaveBeenCalled();
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
});
