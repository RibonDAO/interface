// import personPaymentApi from ".";
import api from "..";

describe("personPaymentApi", () => {
  describe("FUNCTION YOU WANT TO TEST", () => {
    beforeEach(() => {
      // If it's a different method just change it to: post, put, delete, etc.
      api.get = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      expect(api.get).toHaveBeenCalledWith("/api/v1/sample_url");
    });
  });
});
