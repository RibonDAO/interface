import usersApi from ".";
import api from "..";

describe("usersApi", () => {
  describe("#postCreateUser", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      usersApi.postCreateUser("user@test.com", "en-US");

      expect(api.post).toHaveBeenCalledWith("/api/v1/users", {
        email: "user@test.com",
        language: "en-US",
      });
    });
  });

  describe("#postSearchUser", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      usersApi.postSearchUser("user@test.com");

      expect(api.post).toHaveBeenCalledWith("/api/v1/users/search", {
        email: "user@test.com",
      });
    });
  });

  describe("#postCanDonate", () => {
    beforeEach(() => {
      api.post = jest.fn();
    });

    it("expects to send a get request with the correct info: url, params and headers", () => {
      usersApi.postCanDonate(1);

      expect(api.post).toHaveBeenCalledWith("/api/v1/users/can_donate", {
        integrationId: 1,
      });
    });
  });
});
